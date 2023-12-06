import { createRoot } from 'react-dom/client'
import {NextUIProvider, Tooltip, Button} from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { IconLogout, IconUsers } from '@tabler/icons-react'
import './index.css'

const rootElement = document.createElement('div')
document.body.prepend(rootElement)
const guiRoot = createRoot(rootElement)

function Index()
{
    const [xpartyId, setXpartyId] = useState<string | undefined>()
    const [loading, setLoading] = useState<boolean>(false)

    async function handleLeave()
    {
        setLoading(true)
        await chrome.runtime.sendMessage({type: 'leave'})
        setLoading(false)
    }

    useEffect(() =>
    {
        const getXpartyId = async () =>
        {
            const {xpartyId} = await chrome.storage.session.get('xpartyId')
            setXpartyId(xpartyId)
        }

        getXpartyId()
        
        const storageListener = ({xpartyId}:{xpartyId: chrome.storage.StorageChange}) =>
        {
            if(xpartyId)
            setXpartyId(xpartyId.newValue)
        }

        chrome.storage.onChanged.addListener(storageListener)

        return () => chrome.storage.onChanged.removeListener(storageListener)

    }, [])
    

    return xpartyId && <NextUIProvider>
        <div className='fixed bottom-2.5 right-2.5 z-50 bg-neutral-800 p-5 rounded-lg text-gray-300'>
            <div className='flex gap-5'>
                <Tooltip content='leave party u.u'>
                    <Button className='p-1' startContent={loading ? null : <IconLogout className='stroke-gray-300'/>} isIconOnly variant='light' isLoading={loading} onClick={() => handleLeave()}/>
                </Tooltip>
                <div className='flex gap-1'>
                    <IconUsers/>
                    <p className='text-2xl'>1</p>
                </div>
            </div>
        </div>
    </NextUIProvider>
}

guiRoot.render(<Index/>)