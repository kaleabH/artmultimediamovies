import { useTheme } from '@mui/material';
import { Box } from '@mui/system';
import logo1 from '../../assets/logor1.png'
import logo2 from '../../assets/logor2.png'
const Logo = () => {
  const theme = useTheme();

  return (
    // <Typography fontWeight="700" fontSize="1.7rem">
    //   ART<span style={{ color: theme.palette.primary.main }}>MULTIMEDIA</span>
    // </Typography>

          <Box>
            <img src={logo1} alt=""
             style={{
                color: theme.palette.primary.main,
                maxWidth: '200px', 
                maxHeight: '60px', 
                filter:'brightness(150%)'
                
              }}
              />
              <img src={logo2} alt=""
             style={{
                color: theme.palette.primary.main,
                maxWidth: '250px', 
                maxHeight: '100px', 
                filter:"brightness(100%)",
                // filter: 'hue-rotate(180deg)',

                
              }}
              />

          </Box>
  );
};

export default Logo;