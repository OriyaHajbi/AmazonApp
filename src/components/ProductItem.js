import { urlForThumbnail } from '@/utils/image'
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Link, Rating, Typography } from '@mui/material'
import React from 'react'

export default function ProductItem({ product }) {
    return (
        <Card>
            <CardActionArea>
                <CardMedia component='img' image={urlForThumbnail(product.image)} title={product.title} />
                <CardContent>
                    <Link href={`/product/${product.slug.current}`}>
                        <Typography>{product.name}</Typography>
                    </Link>
                    <Rating value={product.rating} readOnly></Rating>
                </CardContent>
            </CardActionArea>

            <CardActions>
                <Typography>${product.price}</Typography>
                <Button size='small' color='primary'>Add to cart</Button>
            </CardActions>
        </Card>
    )
}
