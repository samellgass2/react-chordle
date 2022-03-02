import { useAlert } from '../context/AlertContext'


export const VALID_GUESSES = [
  [0, 4, 7, 12], //C major
  [1, 5, 8, 13], //C# major
  [2, 6, 9, 14] ] //D major

export const validate_guess = (guess : number[]) => {
  var mutable = [...guess]

  // First, make chord relative to root and reduce to one octave
  var seen = new Set()
  const root = Math.min(...guess)
  for (let i = 0; i < mutable.length; i++) {
    if (seen.has(mutable[i])) {
      return false;
    } else {
      seen.add(mutable[i])
    } // Check for duplicates before modification
    mutable[i] = (mutable[i]-root) % 12
  }

  // Then, simplify the guess by removing redundant voicingsjava
  let simplified = mutable.filter(function(note, position) {
    return mutable.indexOf(note) == position
  })

  simplified.sort(function(a, b) {
    return a - b;
  })

  let chrdstr = JSON.stringify(simplified)

  // Check if triad
  if (simplified.length === 3) {
    if (chrdstr === '[0,4,7]' || 
        chrdstr === '[0,3,8]' ||
        chrdstr === '[0,5,9]') {
          return true           // major triad with a doubling
        }
    else if (chrdstr === '[0,3,7]' ||
            chrdstr === '[0,4,9]' ||
            chrdstr === '[0,5,8]') {
              return true     // minor triad with a doubling
            }
    else if (chrdstr === '[0,4,8]') {
      return true             // augmented triad - symmetric in inversion!
    }
    else if (chrdstr === '[0,3,6]' ||
              chrdstr === '[0,3,9]' ||
              chrdstr === '[0,6,9]')
      return true             // no-7th diminished triad with a doubling
  }
  else {                      //7th chord cases
    if (chrdstr === '[0,4,7,11]' ||         //fails, but other 3 work
        chrdstr === '[0,3,7,8]' ||          
        chrdstr === '[0,4,5,9]' ||          
        chrdstr === '[0,1,5,8]') {
          return true             // Major 7th triad
  } else if (chrdstr === '[0,3,7,10]' ||    //fails, but other 3 work
              chrdstr === '[0,4,7,9]' ||
              chrdstr === '[0,3,5,8]' ||
              chrdstr === '[0,2,5,9]'
              ) {
          return true           // Minor 7th triad
              }
    else if (chrdstr === '[0,3,6,9]') {
      return true               // fully diminished triad - symmetric in all 4 inversions!

    } else if (chrdstr === '[0,4,7,10]' ||  //fails, but other 3 work
                chrdstr === '[0,3,6,8]' ||
                chrdstr === '[0,3,5,9]' ||
                chrdstr === '[0,2,6,9]'
    ) {
      return true             // dominant 7th triad

    }
  }
  return false
}