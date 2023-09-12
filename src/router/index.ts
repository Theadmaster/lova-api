import userRouter from './user-router'
import homeRouter from './home-router'
import secretRouter from './secret-router'

export default [
    ...userRouter,
    ...homeRouter,
    ...secretRouter
]