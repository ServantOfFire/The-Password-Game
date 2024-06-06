async function getVideoDuration(videoId) {
    if (typeof YouTubeApiKey == 'undefined' && inputfield.innerText.includes('youtube.com/watch?v=H10xp3u5AxE')) {
        workingLink = videoId
        return
    } else if (typeof YouTubeApiKey != 'undefined'){
        var response = await fetch("https://www.googleapis.com/youtube/v3/videos?id=" + videoId + "&part=contentDetails&key=" + YouTubeApiKey);
        var result = await response.json();
        if (result) {
            var item = result.items[0];
            var duration = item?.contentDetails?.duration
            if (duration == `PT${minutes}M${seconds}S` || duration == `PT${minutes}M${seconds - 1}S`|| duration == `PT${minutes}M${seconds + 1}S`) {
                workingLink = videoId
                setTimeout(() => {
                    update()
                }, 500);
                return
            } else {
                workingLink = ' '
                return
            }
        }
        workingLink = ' '
        return false
    }

}
