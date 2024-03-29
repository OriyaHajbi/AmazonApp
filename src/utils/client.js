import { createClient } from '@sanity/client'
import config from './config'

export const client = createClient({
    projectId: config.projectId,
    dataset: config.dataset,
    useCdn: true,
    apiVersion: '2021-08-31',
})