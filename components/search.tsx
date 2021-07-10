import React, { FC, useState } from 'react'
import axios from 'axios'
import Image from 'next/image'
import styles from '../styles/Video.module.css'

export const Search: FC = () => {
  const [keyword, setKeyword] = useState<string>('')
  const [formDisabled, setoFrmDisabled] = useState<boolean>(false)
  const [videoItems, setVideoItems] = useState([])

  const handleInputKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
  }
  const views = [
    { num: '5', value: '5' },
    { num: '10', value: '10' },
    { num: '20', value: '20' },
    { num: '50', value: '50' },
  ]
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await axios
      .get(
        `https://www.googleapis.com/youtube/v3/search?type=video&part=snippet&q=${keyword}&maxResults=30&order=viewCount&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`
      )
      .then((res) => {
        setoFrmDisabled(true)
        console.log(res.data)
        setVideoItems(res.data.items)
        // console.log(videoItems)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setoFrmDisabled(false)
      })
  }
  return (
    <>
      <p className={styles.welcome}>Youtube Search</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="keyword"
          value={keyword}
          onChange={handleInputKeyword}
          disabled={formDisabled}
          className={styles.keyword}
        />
      </form>
      <table>
        <tbody>
          {videoItems.map((video, i) => (
            <tr key={i}>
              <td>
                <Image
                  // @ts-ignore
                  src={video.snippet.thumbnails.medium.url}
                  alt="thumbnailsUrl"
                  // @ts-ignore
                  height={video.snippet.thumbnails.medium.height}
                  // @ts-ignore
                  width={video.snippet.thumbnails.medium.width}
                />
              </td>
              <td className={styles.info}>
                <strong className="channelName">
                  <a
                    // @ts-ignore
                    href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.title}
                  >
                    {/*  @ts-ignore */}
                    {video.snippet.title}
                  </a>
                </strong>
                <br />
                {/*  @ts-ignore */}
                {video.snippet.channelTitle}
                <br />
                <span className={styles.description}>
                  {/*  @ts-ignore */}
                  {video.snippet.description}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
