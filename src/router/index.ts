import userRouter from './user-router'
import homeRouter from './home-router'
import secretRouter from './secret-router'
import momentRouter from './moment-router'
import commonRouter from './common-router'

export default [
    ...userRouter,
    ...homeRouter,
    ...secretRouter,
    ...momentRouter,
    ...commonRouter
]