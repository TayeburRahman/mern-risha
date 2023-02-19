import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import {
    Box, Container,
    Divider, Grid,
    Typography
} from '@mui/material';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
// import visaCard from 'https://i.ibb.co/9c8r0S4/visa-Card-a58ef200c8ef79745947.png';
import './sheard.css';



 
 
const itemData = [
    {
        img: 'https://i.ibb.co/rF20S87/images-1.jpg',
        title: 'Breakfast',
        rows: 2,
        cols: 2,
    },
    {
        img: 'https://i.ibb.co/25bmZWH/images-2.jpg',
        title: 'Burger',
    },
    {
        img: 'https://i.ibb.co/5KxqNG4/images.jpg',
        title: 'Camera',
    },
    {
        img: 'https://i.ibb.co/DWk80J8/blog-ideas.jpg',
        title: 'Coffee',
        cols: 2,
    },
];
 

 

 

function srcset(image, size, rows = 1, cols = 1) {
    return {
        src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
        srcSet: `${image}?w=${size * cols}&h=${
            size * rows
        }&fit=crop&auto=format&dpr=2 2x`,
    };
}



const footerBg = {
    background: `url(https://www.designbolts.com/wp-content/uploads/2012/12/Worn-Dots-White-Seamless-Pattern.jpg)`,
    backgroundColor: `rgb(2 12 15 / 90%)`,
    backgroundBlendMode: `darken, luminosity`,
    backgroundPossition: `center`,
    backgroundRepeat: `no-repeat`,
    backgroundSize: `100%`,
};

const Footer = () => {
    return (
        <Box 
            sx={{
                pb: 5,
                fontFamily: "'Skranji' , cursive", marginTop:"200px"
            }}
            style={footerBg}
        >
            <Container>
                <Grid container>
                    <Grid className='text-left' md={3} sm={6} xs={12} sx={{ my: 5 }}>
                     <Typography variant='h4' className='text-Left' sx={{color:"white"}}>Risha</Typography>

                        <Grid container sx={{ color: '#9bb8cc', width: '90%' }}>
                            <Typography variant="caption">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Delectus nisi dignissimos amet
                                cum ea ab placeat. Cupiditate quod est corporis
                                voluptatum quia. Et obcaecati Tempore, expedita
                                cumque! Provident.
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid className='text-left' item md={3} sm={6} xs={12} sx={{ my: 5 }}>
                        <Typography
                            variant="h6"
                            sx={{
                                mb: 5,
                                color: 'red',
                                fontFamily: "'Skranji' , cursive",
                            }}
                        >
                            Address & Contact
                        </Typography>
                        <Typography
                            variant="subtitle2"
                            sx={{
                                my: 2,
                                pr: 14,
                                fontSize: 13,
                                color: '#b2c3cb',
                            }}
                        >
                            1234 Somewhere Rd.Estronpark, TN 00018 United
                            States.
                        </Typography>
                        <Typography
                            variant="subtitle2"
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                fontSize: { md: 18, sm: 16 },
                                color: 'white',
                            }}
                            gutterBottom
                        >
                            <EmailIcon sx={{ mr: 1 }} />
                            watch@example.com
                        </Typography>
                        <Typography
                            variant="subtitle2"
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                fontSize: { md: 18, sm: 16 },
                                my: 2,
                                color: 'white',
                            }}
                            gutterBottom
                        >
                            <LocalPhoneIcon sx={{ mr: 1 }} />
                            +01000000000
                        </Typography>
                    </Grid>
                    <Grid className='text-left' item md={3} sm={6} xs={12} sx={{ my: 5 }}>
                        <Typography
                            variant="h6"
                            sx={{
                                mb: 5,
                                color: 'red',
                                fontFamily: "'Skranji' , cursive",
                            }}
                        >
                            Content Generator
                        </Typography>
                        <Typography
                            gutterBottom
                            sx={{ fontSize: 13, color: '#9bb8cc' }}
                        >
                           Seiko Prospex
                        </Typography>
                        <Typography
                            gutterBottom
                            sx={{ fontSize: 13, color: '#9bb8cc' }}
                        >
                            Tissot T-Race
                        </Typography>
                        <Typography
                            gutterBottom
                            sx={{ fontSize: 13, color: '#9bb8cc' }}
                        >
                            Movado Edge
                        </Typography>
                        <Typography
                            gutterBottom
                            sx={{ fontSize: 13, color: '#9bb8cc' }}
                        >
                            Victorinox 
                        </Typography>
                        <Typography
                            gutterBottom
                            sx={{ fontSize: 13, color: '#9bb8cc' }}
                        >
                            G-Shock
                        </Typography>
                    </Grid>

                    <Grid item md={3} sm={6} xs={12} sx={{ my: 5 }}>
                        <Typography
                            variant="subtitle1"
                            sx={{
                                mb: 5,
                                color: 'white',
                                fontFamily: "'Monoton',cursive",
                            }}
                        >
                            Blog Content
                        </Typography>
 

                        <ImageList
                            sx={{
                                width: '100%',
                                height: '200px',
                                borderRadius: 2,
                            }}
                            variant="quilted"
                            cols={4}
                            rowHeight={98}
                        >
                            {itemData.map((item) => (
                                <ImageListItem
                                    key={item.img}
                                    cols={item.cols || 1}
                                    rows={item.rows || 1}
                                >
                                    <img
                                        {...srcset(
                                            item.img,
                                            121,
                                            item.rows,
                                            item.cols
                                        )}
                                        alt={item.title}
                                        loading="lazy"
                                    />
                                </ImageListItem>
                            ))}
                        </ImageList>
                    </Grid>
                </Grid>
                <Divider />
                <Grid
                    container
                    sx={{
                        mt: 1,
                    }}
                >
                    <Grid
                        item
                        md={12}
                        sm={12}
                        xs={12}
                        sx={{
                            alignItems: { md: 'center', sm: 'center' },
                            display: { md: 'flex', sm: 'flex' },
                            justifyContent: {
                                md: 'space-between',
                                sm: 'space-between',
                            },
                        }}
                    >
                        <Typography variant="body2" sx={{ color: 'white' }}>
                            © Copyright 2022 Tayebur rahman - All Right Reserved.
                        </Typography>
                        <img
                            component="img"
                            src="https://i.ibb.co/5GMR3wj/visa-Card-a58ef200c8ef79745947.png"
                            alt="visa"
                             className='imagevisa'
                        />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Footer;