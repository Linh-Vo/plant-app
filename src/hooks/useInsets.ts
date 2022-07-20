import {ViewStyle} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface InsetStyleProps {
  containerStyle?: ViewStyle;
}
export const useInset = (props: InsetStyleProps) => {
  const insets = useSafeAreaInsets();
  return {
    top: insets.top,
    bottom: insets.bottom,
    left: insets.left,
    right: insets.right,
    containerStyle: {...props.containerStyle, paddingTop: insets.top},
  };
};
