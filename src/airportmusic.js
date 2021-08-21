// played in 4/4
/* const tempo = 60 // BPM (beats per minute)

const halfNoteTime = (60 / tempo) * 2
const quarterNoteTime = (60 / tempo)
const eighthNoteTime = (60 / tempo) / 2
*/
const LENGTHS = {
    F: 2,
    H: 1.0,
    Q: 0.5,
    E: 0.25
}

// eight samples
const samples = [
    {
        length: 17069,
        notes: [
            'C2F', // full note
        ],
        delay: 11715
    },
    {
        length: 23157,
        notes: [
            'A1H', // quarter
            'F1H', // quarter
            'A0F' // half
        ],
        delay: 3917
    },
    {
        length: 29501,
        notes: [
            'F1F', // half
            'C1F', // half
            'E1F', // half
            'C1F' // half
        ],
        delay: 11872
    },
    { // bass
        length: 31101,
        notes: [
            'C1F' // full
        ],
        delay: 5761
    },
    {
        length: 20752,
        notes: [
            'F0H', // quarter
            'F1F', // quarter
            'G1F', // half
            'E1F', // half
            'C1F', // half
        ],
        delay: 0
    },
    {
        length: 27999,
        notes: [
            // arpeggio - up
            'ARP',
            'G1F', // full
            'F1F', // full
            'C1F', // full
            'G1F', // full
        ],
        delay: 9773
    },
    {
        length: 30034,
        notes: [
            'C1F', // full
        ],
        delay: 8761
    },
    { // bass
        length: 38049,
        notes: [
            'E0F', // full note
            'A-1F' // full note
        ],
        delay: 6833
    }
]

const convertNoteToFreq = (note, octave) => {
    const i = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'].findIndex(n => n === note) + (octave * 12)
    return 130.81 * 1.06 ** i
}

// xems ungolfed minisynth code
const play = (e, t) => {
    // V: note length in seconds
    let V = t
    // Modulation
    // This function generates the i'th sample of a sinusoidal signal with a specific frequency and amplitude
    const b = (e, t, a, i) => Math.sin(e / t * 6.28 * a + i)
    // Instrument synthesis
     let w = (e, t) => Math.sin(e / 44100 * t * 6.28 + b(e, 44100, t, 0) ** 2 + .75 * b(e, 44100, t, .25) + .1 * b(e, 44100, t, .5))
    // Sound samples
    let D = []
    // Loop on all the samples
    for(
      let i = 0;
      i < 44100 * V;
      i++
    ){

      // Fill the samples array
      D[i] =

        // The first 88 samples represent the note's attack
        i < 88
        ? i / 88.2 * w(i, e)

        // The other samples represent the rest of the note
        : (1 - (i - 88.2) / (44100 * (V - .002))) ** ((.5 * Math.log(1e4 * e / 44100)) ** 2) * w(i, e);
    }
    // Play the note
    const A = new AudioContext
    const m = A.createBuffer(1, 1e6, 44100)
    m.getChannelData(0).set(D)
    const s = A.createBufferSource()
    s.buffer = m
    s.connect(A.destination)
    s.start()
  }

export { samples, play, convertNoteToFreq, LENGTHS }