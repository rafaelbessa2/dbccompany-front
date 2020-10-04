export async function fileToBase64(file: File): Promise<unknown> {
  const promise = new Promise((resolve, reject) => {
    var reader = new FileReader();
    reader.onload = function (event: any) {
      resolve(event.target.result);
    };
    reader.readAsDataURL(file);
  });
  return promise;
}
