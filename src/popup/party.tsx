import { Button } from '@nextui-org/react'
import { useState } from 'react'

export function Party()
{
    const [loading, setLoading] = useState<boolean>(false)

    async function handleLeave()
    {
        setLoading(true)
        await chrome.runtime.sendMessage({type: 'leave'})
        setLoading(false)
    }

    return <div className='flex flex-col gap-5'>
        <p className='text-stone-100 text-center'>You are in a party!</p>
        <Button radius='full' onClick={() => handleLeave()} isLoading={loading}>{loading ? 'leaving' : 'leave'}</Button>
    </div>
}