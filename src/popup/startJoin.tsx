import {Button, Input} from '@nextui-org/react'
import { useEffect, useState } from 'react'

export function StartJoin()
{
    const [username, setUsername] = useState<string>('')
    const [partyId, setPartyId] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() =>
    {
        const getXpartyUsername = async () =>
        {
            const {xpartyUsername} = await chrome.storage.local.get('xpartyUsername')
            if(xpartyUsername) setUsername(xpartyUsername)
        }

        getXpartyUsername()
    },[])

    useEffect(() =>
    {
        const setXpartyUsername = async () =>
        {
            await chrome.storage.local.set({xpartyUsername: username})
        }

        setXpartyUsername()
    }, [username])

    async function handleStartJoin()
    {
        setLoading(true)
        await chrome.runtime.sendMessage({type: 'start'})
        setLoading(false)
    }

    return <div className='flex flex-col gap-5'>
        <Input label='username' radius='full' size='sm' value={username} onValueChange={setUsername} isDisabled={loading}/>
        <Input label='party ID' radius='full' size='sm' value={partyId} onValueChange={setPartyId} isDisabled={loading}/>
        <Button radius='full' onClick={() => handleStartJoin()} isLoading={loading}>{partyId.length > 0 ? loading? 'joining' : 'join' : loading ? 'starting' : 'start'}</Button>
    </div>
}