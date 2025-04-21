'use client'

import React, {
  useState,
  useRef,
  cloneElement,
  isValidElement,
  ReactElement,
  Ref
} from 'react'
import EmojiPicker from 'emoji-picker-react'
import { Smile } from 'lucide-react'

interface EmojiInputProps {
  children: ReactElement<{
    ref?: Ref<HTMLInputElement | HTMLTextAreaElement>
    value?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  }>
  value: string
  onChangeText: (value: string) => void
}

const EmojiInput = ({ children, value, onChangeText }: EmojiInputProps) => {
  const [showPicker, setShowPicker] = useState(false)
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null)

  const handleEmojiClick = (emojiData: any) => {
    const emoji = emojiData.emoji
    const input = inputRef.current

    if (!input) return

    const start = input.selectionStart || 0
    const end = input.selectionEnd || 0
    const newText = value.slice(0, start) + emoji + value.slice(end)

    onChangeText(newText)

    setTimeout(() => {
      input.focus()
      input.setSelectionRange(start + emoji.length, start + emoji.length)
    }, 0)

    setShowPicker(false)
  }

  const clonedChild = isValidElement(children)
    ? cloneElement(children, {
        ref: inputRef,
        value,
        onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
          onChangeText(e.target.value)
      })
    : null

  return (
    <div className="relative w-full max-w-md">
      <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white">
        {clonedChild}
        <button
          type="button"
          onClick={() => setShowPicker(!showPicker)}
          className="ml-2 text-gray-600 hover:text-black"
        >
          <Smile size={20} />
        </button>
      </div>

      {showPicker && (
        <div className="absolute bottom-12 left-0 z-50">
          <EmojiPicker onEmojiClick={handleEmojiClick} lazyLoadEmojis />
        </div>
      )}
    </div>
  )
}
export default EmojiInput