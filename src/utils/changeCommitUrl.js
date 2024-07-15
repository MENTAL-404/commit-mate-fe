export const convertApiUrlToWebUrl = (url) => {
  const regex =
    /https:\/\/api\.github\.com\/repos\/([^\/]+)\/([^\/]+)\/git\/commits\/([a-f0-9]+)/
  const match = url.match(regex)

  if (match) {
    const owner = match[1]
    const repo = match[2]
    const commitHash = match[3]
    return `https://github.com/${owner}/${repo}/commit/${commitHash}`
  }
  throw new Error('변환 오류남')
}
