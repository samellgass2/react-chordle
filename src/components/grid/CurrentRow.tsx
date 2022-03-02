import { MAX_WORD_LENGTH } from '../../constants/settings'
import { Cell } from './Cell'
import { unicodeSplit } from '../../lib/words'
import { NOTENAME_TO_NUM } from '../../constants/musicalnotation'

type Props = {
  guess: number[]
  className: string
}

export const CurrentRow = ({ guess, className }: Props) => {
  const emptyCells = Array.from(Array(MAX_WORD_LENGTH - guess.length))
  const classes = `flex justify-center mb-1 ${className}`

  return (
    <div className={classes}>
      {guess.map((note, i) => (
        <Cell key={i} value={String(note)} />
      ))}
      {emptyCells.map((_, i) => (
        <Cell key={i} />
      ))}
    </div>
  )
}
