import { getGuessStatuses } from '../../lib/statuses'
import { Cell } from './Cell'
import { unicodeSplit } from '../../lib/words'
import { NOTENAME_TO_NUM, NUM_TO_NOTENAME} from '../../constants/musicalnotation'

type Props = {
  guess: number[]
  isRevealing?: boolean
}

export const CompletedRow = ({ guess, isRevealing }: Props) => {
  const statuses = getGuessStatuses(guess)
  //const splitGuess = unicodeSplit(guess)

  return (
    <div className="flex justify-center mb-1">
      {guess.map((note, i) => (
        <Cell
          key={i}
          value={String(note)}
          status={statuses[i]}
          position={i}
          isRevealing={isRevealing}
          isCompleted
        />
      ))}
    </div>
  )
}
