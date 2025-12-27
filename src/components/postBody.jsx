
export default function postBody({post}) {
  return (
    <p className="text-base mb-4 text-gray-800 dark:text-gray-300 whitespace-normal break-words overflow-wrap-anywhere">
        {post.body}
    </p>
  )
}
