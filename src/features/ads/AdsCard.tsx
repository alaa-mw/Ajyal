import React from 'react'
import { Card, CardContent, Typography, Box } from '@mui/material'


interface AdsCardProps {
  title: string
  body: string
  creation_date: Date | string
}

const AdsCard: React.FC<AdsCardProps> = ({ title, body, creation_date }) => {
  // Format the date properly
//   const formattedDate = format(
//     typeof creation_date === 'string' ? new Date(creation_date) : creation_date,
//     'dd/MM/yyyy'
//   )

  return (
    <Card sx={{ 
      maxWidth: 345,
      mb: 2,
      boxShadow: 3,
      borderRadius: 2,
      '&:hover': {
        boxShadow: 6,
        transform: 'translateY(-2px)',
        transition: 'all 0.3s ease'
      }
    }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        
        <Typography variant="body2" color="text.secondary" sx={{ 
          mb: 2,
          whiteSpace: 'pre-line' 
        }}>
          {body}
        </Typography>
        
        <Box sx={{ 
          display: 'flex',
          justifyContent: 'flex-end'
        }}>
          <Typography variant="caption" color="text.disabled">
            {creation_date}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

export default AdsCard