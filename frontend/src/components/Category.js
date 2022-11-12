import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Category = ({category}) => {
    return (
        
    <Link to={``}>
        <Card className='my-3 p-3 rounded'>
            <Card.Img src={category.image} variant='top' />
            <Card.Body>
                    <Card.Title as='div'>
                        <strong>{category.title}</strong>
                    </Card.Title>
                <Card.Text as='div'>
                </Card.Text>
            </Card.Body>
        </Card>
    </Link>
    )
}

export default Category
