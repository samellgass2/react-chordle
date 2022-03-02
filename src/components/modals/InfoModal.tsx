import { Cell } from '../grid/Cell'
import { BaseModal } from './BaseModal'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const InfoModal = ({ isOpen, handleClose }: Props) => {
  return (
    <BaseModal title="How to play" isOpen={isOpen} handleClose={handleClose}>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        Guess the chord in 5 tries. After each guess, the color of the tiles will
        change to show how close your guess was to the chord.
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell
          isRevealing={true}
          isCompleted={true}
          value="C3"
          status="correct"
        />
        <Cell value="E3" />
        <Cell value="G3" />
        <Cell value="C4" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        The note C3 is in the chord in the correct spot, as the bass.
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="D3" />
        <Cell
          isRevealing={true}
          isCompleted={true}
          value="F#3"
          status="present"
        />
        <Cell value="A3" />
        <Cell value="C4" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        The note F#3 is in the chord, but is not that member of the chord.
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="B2" />
        <Cell value="G3" />
        <Cell isRevealing={true} isCompleted={true} value="D3" status="absent" />
        <Cell value="F3" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        The note D3 is not in the chord at all.
      </p>
      &nbsp;
      <p className="text-sm text-gray-500 dark:text-gray-300">
      You may guess any valid four-note chord,
        in any inversion.
      </p>

      <p className="mt-6 italic text-sm text-gray-500 dark:text-gray-300">
        This game is still a work in progress, thanks for checking it out!
      </p>
    </BaseModal>
  )
}
