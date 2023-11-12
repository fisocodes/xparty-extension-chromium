console.log('XPARTY RUNNING')

chrome.history.onVisited.addListener(function ({url: rawUrl})
{
    if(rawUrl)
    {
        const url = new URL(rawUrl)

        if(url.hostname === 'www.youtube.com' && url.pathname === '/')
        {
            console.log('IN HOME')
        }
        else if(url.hostname === 'www.youtube.com' && url.pathname === '/watch' && url.searchParams.size === 2)
        {
            console.log('WATCHING A VIDEO')
        }

    }
})

chrome.runtime.onMessage.addListener(function(request)
{
    switch(request.type)
    {
        case 'video':
            console.log('MESSAGE FROM VIDEO')
            break
        case 'pop-up':
            console.log('MESSAGE FROM POP UP')
            break
    }
})