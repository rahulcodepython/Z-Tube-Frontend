import React from 'react'
import { BiSend } from '@/data/icons/icons'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

const ReplyForm = () => {
    return (
        <form onSubmit={e => { e.preventDefault(); }} className='flex flex-col gap-2 pt-4'>
            <Textarea placeholder="Add a comment..." rows="3" class="w-full border rounded-md p-2 bg-transparent focus:outline-none focus:ring-0 focus-visible:ring-0" />
            <Button className="w-full flex items-center gap-1">
                <BiSend className='text-base' />
                <span>
                    Send
                </span>
            </Button>
        </form>
    )
}

export default ReplyForm