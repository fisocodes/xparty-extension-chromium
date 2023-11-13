console.log('VIDEO HANDLER MOUNTED')

const videoElement: HTMLVideoElement | null = document.querySelector('video.video-stream.html5-main-video')

function videoListener()
{
    if(videoElement)
    {
        chrome.runtime.sendMessage({
            type: 'video-state',
            paused: videoElement.paused,
            currentTime: videoElement.currentTime
        })
    }
}

if(videoElement)
{
    videoElement.addEventListener('playing', videoListener)
    videoElement.addEventListener('pause', videoListener)
    videoElement.addEventListener('seeked', videoListener)
}

chrome.runtime.onMessage.addListener(function(message)
{
    switch(message.type)
    {
        case 'video-state':

            if(videoElement)
            {
                if(message.paused)
                {
                    videoElement.pause()
                }
                else
                {
                    videoElement.play()
                }

                if(Math.abs(videoElement.currentTime - message.currentTime) > 1)
                {
                    videoElement.currentTime = message.currentTime
                }
            }

            break
    }
})