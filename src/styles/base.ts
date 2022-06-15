import {StyleSheet, Dimensions} from 'react-native';
import {theme} from '../theme/theme';
export const dimensions = {
  fullHeight: Dimensions.get('window').height,
  fullWidth: Dimensions.get('window').width,
};

export const TextStyle = StyleSheet.create({
  baseText: {
    fontFamily: theme.font.familyBold,
    fontStyle: 'normal',
    fontSize: theme.font.xssmall,
    lineHeight: 15,
    color: theme.color.dark,
  },
  titleText: {
    fontFamily: theme.font.familySemiBold,
    fontStyle: 'normal',
    fontSize: theme.font.medium,
    lineHeight: 20,
    color: theme.color.dark,
  },
  h4Text: {
    fontFamily: theme.font.familyBold,
    fontStyle: 'normal',
    fontSize: theme.font.xlarge,
    lineHeight: 28,
    color: theme.color.dark,
  },
  bodyText: {
    fontFamily: theme.font.familyMedium,
    fontStyle: 'normal',
    fontSize: theme.font.medium,
    lineHeight: 20,
    color: theme.color.dark,
  },
  headerText: {
    fontFamily: theme.font.familyExtraBold,
    fontStyle: 'normal',
    fontSize: theme.font.xxxxxlarge,
    lineHeight: 40,
    color: theme.color.white,
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: {
      width: 0,
      height: 4,
    },
    textShadowRadius: 4,
  },
});

export const Container = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreen: {
    width: '100%',
    height: '100%',
  },
});
