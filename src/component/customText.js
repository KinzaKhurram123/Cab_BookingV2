import { Text } from 'react-native';
import Color from '../config/appTheme';

const CustomText = props => {
    const { children, numberOfLines, textAlign, style, isBold, onPress } = props;
    return (
        <Text
            onPress={onPress}
            style={[
                {
                    textTransform: 'capitalize',
                    color: Color.black,
                    textAlign: textAlign,
                },
                style,
                { fontFamily: 'Quicksand-Regular' },
                isBold && {
                    fontFamily: 'Quicksand-Bold',
                    fontWeight: 'bold',
                },
            ]}
            numberOfLines={numberOfLines}>
            {children}
        </Text>
    );
};

export default CustomText;
