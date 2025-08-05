import {Zip, ZipPassThrough, strToU8} from "fflate";
import streamSaver from 'streamsaver';

function generateLargeStringArray() {
  console.log('正在生成模拟数据...');
  const arr = [];
  const arraySize = 10000; // 数组包含 10,000 个元素
  const baseString = '这是一个长字符串，用来模拟真实的大数据块。序列号: ';
  for (let i = 0; i < arraySize; i++) {
    // 让每个字符串都足够长
    arr.push(baseString + i + ' | ' + 'A'.repeat(102400) + '\n');
  }
  console.log('模拟数据生成完毕。');
  return arr;
}

const makeZipFile = async () => {
  console.log('preparing big array...');
  const largeStringArray = generateLargeStringArray();
  console.log('preparing big array finished');

  const zip = new Zip();
  const zipChunks: Uint8Array[] = [];

  zip.ondata = (err, data, final) => {
    if (err) {
      console.error('ZIP 创建时发生错误:', err);
      return;
    }

    zipChunks.push(data);

    if (final) {
      console.log('压缩完成，正在创建下载链接...');
      const zipBlob = new Blob(zipChunks, { type: 'application/zip' });
      const downloadUrl = URL.createObjectURL(zipBlob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = 'large_data_archive.zip';
      a.click();
      URL.revokeObjectURL(downloadUrl);

      console.log('下载已开始！处理完成。');
    }
  };

  const fileStream = new ZipPassThrough('all_data_in_one_file.txt');
  zip.add(fileStream);

  for (const str of largeStringArray) {
    const chunk = strToU8(str);
    fileStream.push(chunk);
  }

  fileStream.push(new Uint8Array(0), true);
  zip.end();
};

const Comp = () => {
  return (
    <div
      className={'bg-amber-200 w-[200px] h-[200px]'}
      onClick={makeZipFile}
    >
      click
    </div>
  );
};

export default Comp;