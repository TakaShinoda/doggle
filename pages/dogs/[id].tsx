import { useRouter } from 'next/router'

const Post = () => {
    const router = useRouter()
    const {id} = router.query
    return (
        <div>
            <p>
                ID: {id}
            </p>
            何かかく
        </div>
    )
}

export default Post
