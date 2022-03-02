import { getStatuses } from '../../lib/statuses'
import { Key } from './Key'
import { useEffect } from 'react'
import { ENTER_TEXT, DELETE_TEXT } from '../../constants/strings'
import { localeAwareUpperCase } from '../../lib/words'
import { NOTENAME_TO_NUM } from '../../constants/musicalnotation'


type Props = {
  onChar: (value: string) => void
  onDelete: () => void
  onEnter: () => void
  guesses: number[][]
  isRevealing?: boolean
}

export const Keyboard = ({
  onChar,
  onDelete,
  onEnter,
  guesses,
  isRevealing,
}: Props) => {
  const charStatuses = getStatuses(guesses)

  const onClick = (value: string) => {
    
    if (value === "ENTER") { 
      onEnter()
    } else if (value === "DELETE") { 
      onDelete()
    } else {
      onChar(value)
    }
  }

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.code === 'Enter') {
        onEnter()
      } else if (e.code === 'Backspace') {
        onDelete()
      } else {
        const key = localeAwareUpperCase(e.key)
        // TODO: check this test if the range works with non-english letters
        if (key.length === 1 && key >= 'A' && key <= 'Z') {
          onChar(key)
        }
      }
    }
    window.addEventListener('keyup', listener)
    return () => {
      window.removeEventListener('keyup', listener)
    }
  }, [onEnter, onDelete, onChar])



  return (
    <div>
      <div className="flex justify-center mb-1">
        {['C#3', 'D#3'].map((key) => (
           <Key
            value={key}
            key={key}
            onClick={onClick}
            status={charStatuses[NOTENAME_TO_NUM.get(key)]}
            isRevealing={isRevealing}
          />
        ))}
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        {['F#3', 'G#3', 'A#3'].map((key) => (
           <Key
            value={key}
            key={key}
            onClick={onClick}
            status={charStatuses[NOTENAME_TO_NUM.get(key)]}
            isRevealing={isRevealing}
          />
        ))}       
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        {['C#4', 'D#4'].map((key) => (
           <Key
            value={key}
            key={key}
            onClick={onClick}
            status={charStatuses[NOTENAME_TO_NUM.get(key)]}
            isRevealing={isRevealing}
          />
        ))}  
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        {['F#4', 'G#4', 'A#4'].map((key) => (
           <Key
            value={key}
            key={key}
            onClick={onClick}
            status={charStatuses[NOTENAME_TO_NUM.get(key)]}
            isRevealing={isRevealing}
          />
        ))}  
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </div>
      <div className="flex justify-center mb-1">
        {['C3', 'D3', 'E3', 'F3', 'G3', 'A3', 'B3', 'C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5'].map((key) => (
          <Key
            value={key}
            key={key}
            onClick={onClick}
            status={charStatuses[NOTENAME_TO_NUM.get(key)]}
            isRevealing={isRevealing}
          />
        ))}
      </div>
      <div className="flex justify-center">
        <Key width={65.4} value="ENTER" onClick={onClick}>
          {ENTER_TEXT}
        </Key>
        <Key width={65.4} value="DELETE" onClick={onClick}>
          {DELETE_TEXT}
        </Key>
      </div>
    </div>
  )
}
