//import indigo from '@material-ui/core/colors/indigo';
//import pink from '@material-ui/core/colors/pink';
import tinycolor from "tinycolor2";

const primary = "#C70039";
const secondary = "#CCC";
const warning = "#FFC260";
const success = "#3CD4A0";
const info = "#9013FE";

const lightenRate = 7.5;
const darkenRate = 15;

export default {
    palette: {
        primary: {
            main: primary,
            light: tinycolor(primary)
                .lighten(lightenRate)
                .toHexString(),
            dark: tinycolor(primary)
                .darken(darkenRate)
                .toHexString(),
            contrastText: '#fff'
        },
        secondary: {
            main: secondary,
            light: tinycolor(secondary)
              .lighten(lightenRate)
              .toHexString(),
            dark: tinycolor(secondary)
              .darken(darkenRate)
              .toHexString(),
            contrastText: '#fff'
        },
        warning: {
            main: warning,
            light: tinycolor(warning)
              .lighten(lightenRate)
              .toHexString(),
            dark: tinycolor(warning)
              .darken(darkenRate)
              .toHexString()
          },
          success: {
            main: success,
            light: tinycolor(success)
              .lighten(lightenRate)
              .toHexString(),
            dark: tinycolor(success)
              .darken(darkenRate)
              .toHexString()
          },
          info: {
            main: info,
            light: tinycolor(info)
              .lighten(lightenRate)
              .toHexString(),
            dark: tinycolor(info)
              .darken(darkenRate)
              .toHexString()
          },
    },
    status: {
        danger: 'orange',
    },
    typography: {
        button: {
            fontWeight: 400,
            textAlign: 'capitalize'
        },
    },
};
