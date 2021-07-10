import { useRouter } from 'next/router'

const Post = () => {
    const router = useRouter()
    console.log(router.query)
    const {id} = router.query
    return (
        <div>
            <p>
                ID: {id}
            </p>
        </div>
    )
}

export default Post