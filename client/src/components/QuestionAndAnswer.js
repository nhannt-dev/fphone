import { memo, useState, useCallback } from 'react'
import { apiCreateComment } from '../apis/product'
import { InputComment, Comment } from './'


const QuestionAndAnswer = ({ comments, pid, setRender }) => {
    const [content, setContent] = useState('')
    const handleSendComment = useCallback(async () => {
        const response = await apiCreateComment({ pid, content })
        if (response.err === 0) {
            setRender(prev => !prev)
            setContent('')
        }

    }, [content])
    return (
        <div className='shadow-md border rounded-md p-[10px]'>
            <h3 className='font-bold text-[20px]'>Hỏi & đáp</h3>
            <InputComment
                content={content}
                setContent={setContent}
                handleSendComment={handleSendComment}
            />
            <div className='mt-4 flex flex-col gap-8 pb-8'>
                {comments?.filter(item => !item.parentComment === true)?.map(item => (
                    <Comment
                        key={item.id}
                        commentator={item?.commentator?.name}
                        content={item?.content}
                        createdAt={item?.createdAt}
                        cid={item?.id}
                        pid={pid}
                        setRender={setRender}
                        parents={comments?.filter(i => i.parentComment === item.id)}
                    />
                ))}
            </div>
        </div>
    )
}

export default memo(QuestionAndAnswer)