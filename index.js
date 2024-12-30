const { execSync } = require('child_process');
// basic format conversion/get audio from video you just need change output result suffix
// 基本格式转化 可以通过修改 输出物后缀 比如test.gif test.avi
// 如果像提取视频音频 可以直接修改后缀test.mp3
execSync('ffmpeg -i http://vjs.zencdn.net/v/oceans.mp4 test.mp3', {
	stdio: 'inherit',
});

// https://nodejs.org/api/child_process.html#optionsstdio
// 'inherit': Pass through the corresponding stdio stream to/from the parent process.
// In the first three positions, this is equivalent to process.stdin, process.stdout, and process.stderr, respectively.
// In any other position, equivalent to 'ignore'.

// clip video from 1s to 5s [ -ss 1 -to 5 ]
// https://www.ffmpeg.org/ffmpeg.html#Main-options
// -ss position (input/output)
// 裁剪视频从第10秒到第20秒 最后只有9s (10,20) total 9s 20-10-1=9
execSync(
	'ffmpeg -ss 10 -to 20 -i http://vjs.zencdn.net/v/oceans.mp4 test2.mp4',
	{
		stdio: 'inherit',
	}
);

// watermark
// 加水印
// https://www.ffmpeg.org/ffmpeg.html#Filtering
// -c:a copy：音频直接拷贝，不重新编码。
// overlay=10:10

// 静态图片水印
execSync(
	'ffmpeg -i http://vjs.zencdn.net/v/oceans.mp4 -i https://cdn.pixabay.com/photo/2021/11/26/20/45/lantern-6826697_1280.jpg -filter_complex "overlay=10:10" -c:a copy test3.mp4'
);
// 动态文字水印
execSync(
	'ffmpeg -i http://vjs.zencdn.net/v/oceans.mp4 -vf drawtext=text="ethanshen":fontcolor=white:fontsize=24:x=10:y=10 -c:a copy test4.mp4'
);
// 动态图片水印（GIF 动画）
execSync(
	'ffmpeg -i http://vjs.zencdn.net/v/oceans.mp4 -i https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExcG5neGdsc2NqanQ1ZHNubzU1NWlpZnBsanFiYWVjbWNnMDlzZHA4ayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/EECy1Cp6nyV9e/giphy.gif -filter_complex "overlay=W-w-10:H-h-10" -c:a copy test5.mp4'
);
