
// audio context
const C = new AudioContext
const A = []
const D = i => eval(`K` + i);

// play note
const P = i => i < 0 || A[i] || // is valid and note not playing
(
    A[i] = [         // instruments
        [...`1248`], // 🎹 organ
        [...`3579`], // 🎷 brass
        [...`321`],  // 🎻 strings
        [...`3`],    // ∿ sine
    ][ I ].map( j=> (
        o = C.createOscillator(               // create oscillator
            D(i).style.transition =
                D(i).innerHTML),              // reset transition
        o.connect(                            // oscillator to gain
            o.g = C.createGain(               // create gain node
                o.frequency.value =           // set frequency
                    j * 55 * 2**((i+3)/12)))  // A 55 root note
        .connect(C.destination),              // gain to destination
        o.g.gain.value = .2/(1+Math.log2(j)), // set gain
        o.start(),                            // start audio
        o)                                    // return sound
    ),
    D(i).b = D(i).style.background, // save original color
    D(i).style.background = `#f00`  // set key color red
);

// cancel note
const X = i=> A[i] &&                                 // is already playing?
    A[i].map(o =>                                // for each oscilator
        setTimeout(i => o.stop(), 350,            // stop sound after delay
            o.g.gain.linearRampToValueAtTime(   // set gain start ramp
                o.g.gain.value, C.currentTime), // set gain
            o.g.gain.linearRampToValueAtTime(   // ramp off gain
                A[i] = 0, C.currentTime + .3),  // clear note
            D(i).style.transition = `.5s`,      // set transition
            D(i).style.background = D(i).b));   // reset original color

var RhythmSample = {
};

RhythmSample.play = function() {
  function playSound(buffer, time) {
    var source = context.createBufferSource();
    source.buffer = buffer;
    source.connect(context.destination);
    if (!source.start)
      source.start = source.noteOn;
    source.start(time);
  }

  var kick = BUFFERS.kick;
  var snare = BUFFERS.snare;
  var hihat = BUFFERS.hihat;

  // We'll start playing the rhythm 100 milliseconds from "now"
  var startTime = context.currentTime + 0.100;
  var tempo = 80; // BPM (beats per minute)
  var eighthNoteTime = (60 / tempo) / 2;

  // Play 2 bars of the following:
  for (var bar = 0; bar < 2; bar++) {
    var time = startTime + bar * 8 * eighthNoteTime;
    // Play the bass (kick) drum on beats 1, 5
    playSound(kick, time);
    playSound(kick, time + 4 * eighthNoteTime);

    // Play the snare drum on beats 3, 7
    playSound(snare, time + 2 * eighthNoteTime);
    playSound(snare, time + 6 * eighthNoteTime);

    // Play the hi-hat every eighthh note.
    for (var i = 0; i < 8; ++i) {
      playSound(hihat, time + i * eighthNoteTime);
    }
  }
};

// generate a basic reverb effect
function impulseResponse( duration, decay, reverse ) {
  var sampleRate = audioContext.sampleRate;
  var length = sampleRate * duration;
  var impulse = audioContext.createBuffer(2, length, sampleRate);
  var impulseL = impulse.getChannelData(0);
  var impulseR = impulse.getChannelData(1);

  if (!decay)
      decay = 2.0;
  for (var i = 0; i < length; i++){
    var n = reverse ? length - i : i;
    impulseL[i] = (Math.random() * 2 - 1) * Math.pow(1 - n / length, decay);
    impulseR[i] = (Math.random() * 2 - 1) * Math.pow(1 - n / length, decay);
  }
  return impulse;
}