chrome.storage.session.setAccessLevel({accessLevel: 'TRUSTED_AND_UNTRUSTED_CONTEXTS'})

// jsonlink

chrome.webNavigation.onHistoryStateUpdated.addListener(async ({url}) =>
{
    const {search: query} = new URL(url)
    const {currentVideoQuery} = await chrome.storage.session.get('currentVideoQuery')
    
    if(query !== currentVideoQuery)
    {
        console.log("CHANGED VIDEO")
        chrome.storage.session.set({currentVideoQuery: query})
    }
},
{url:[
    {
        hostEquals: 'www.youtube.com',
        pathEquals: '/watch',
        queryContains: 'ab_channel=',
        queryPrefix: 'v='
    }
]})

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse)
{
    sender
    switch(message.type)
    {
        case 'video-state':

            console.log('MESSAGE FROM VIDEO HANDLER')
            break

        case 'start':

            setTimeout(async () =>
            {
                await chrome.storage.session.set({xpartyId: 'ABC123'})
                sendResponse('STARTED SUCCESSFULLY')
            }, 3000)

            break
        
        case 'leave':

            setTimeout(async () =>
            {
                await chrome.storage.session.remove('xpartyId')
                sendResponse('LEFT SUCCESSFULLY')
            }, 3000)

            break
    }

    return true
})