console.log('XPARTY RUNNING')

chrome.history.onVisited.addListener(function ({url: rawUrl})
{
    if(rawUrl)
    {
        const url = new URL(rawUrl)

        if(url.hostname === 'www.youtube.com' && url.pathname === '/')
        {
            chrome.tabs.query({active: true, currentWindow: true}, function([tab])
            {
                chrome.storage.session.set({xpartyTab: tab.id}).then(() => console.log('XPARTY TAB SET'))
            })

            console.log('IN HOME')
        }
        else if(url.hostname === 'www.youtube.com' && url.pathname === '/watch' && url.searchParams.size === 2)
        {
            chrome.tabs.query({active: true, currentWindow: true}, function([tab])
            {
                chrome.storage.session.set({xpartyTab: tab.id}).then(() => console.log('XPARTY TAB SET'))
            })
            console.log('WATCHING A VIDEO')
        }
    }
})

chrome.runtime.onMessage.addListener(async function(message)
{
    switch(message.type)
    {
        case 'video-state':

            const {xpartyTab} = await chrome.storage.session.get('xpartyTab')
            chrome.tabs.sendMessage(xpartyTab, message)

            break

        case 'pop-up':

            console.log('MESSAGE FROM POP UP')

            break
    }
})