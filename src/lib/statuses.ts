import { solution, unicodeSplit } from './words'

export type CharStatus = 'absent' | 'present' | 'correct'

export const getStatuses = (
  guesses: number[][]
): { [key: number]: CharStatus } => {
  const charObj: { [key: number]: CharStatus } = {}

  guesses.forEach((chord) => {
    chord.forEach((note, i) => {
      if (!solution.includes(note)) {
        // make status absent
        return (charObj[note] = 'absent')
      }

      if (note === solution[i]) {
        //make status correct
        return (charObj[note] = 'correct')
      }

      if (charObj[note] !== 'correct') {
        //make status present
        return (charObj[note] = 'present')
      }
    })
  })

  return charObj
}

export const getGuessStatuses = (guess: number[]): CharStatus[] => {

  const solutionCharsTaken = solution.map((_) => false)

  const statuses: CharStatus[] = Array.from(Array(guess.length))

  // handle all correct cases first
  guess.forEach((note, i) => {
    if (note === solution[i]) {
      statuses[i] = 'correct'
      solutionCharsTaken[i] = true
      return
    }
  })

  guess.forEach((note, i) => {
    if (statuses[i]) return

    if (!solution.includes(note)) {
      // handles the absent case
      statuses[i] = 'absent'
      return
    }

    // now we are left with "present"s
    const indexOfPresentChar = solution.findIndex(
      (x, index) => x === note && !solutionCharsTaken[index]
    )

    if (indexOfPresentChar > -1) {
      statuses[i] = 'present'
      solutionCharsTaken[indexOfPresentChar] = true
      return
    } else {
      statuses[i] = 'absent'
      return
    }
  })

  return statuses
}
