import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {ScreenProps} from 'types';
import {SCREEN_NAME} from '../utils/constants';

interface Props {
  isFocused?: boolean;
  name: string;
}
export const TabIcon = React.memo(
  (props: Props) => {
    let icon = <></>;
    switch (props.name) {
      case SCREEN_NAME.Home:
        icon = (
          <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <Path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M3.14002 8.37009L10.07 2.8201C11.13 1.9701 12.86 1.97008 13.93 2.83008L20.86 8.37009C21.63 8.99009 22.13 10.3001 21.97 11.2801L20.64 19.2401C20.4 20.6501 19.03 21.8101 17.6 21.8101H6.40002C4.96002 21.8101 3.60002 20.6601 3.36002 19.2401L2.03002 11.2801C1.86002 10.3001 2.36002 8.99009 3.14002 8.37009Z"
              fill={props.isFocused ? '#678F58' : '#22222266'}
            />
            <Path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M14.5 13C14.5 14.3807 13.3807 15.5 12 15.5C10.6193 15.5 9.5 14.3807 9.5 13C9.5 11.6193 10.6193 10.5 12 10.5C13.3807 10.5 14.5 11.6193 14.5 13Z"
              fill={'white'}
            />
          </Svg>
        );
        break;
      case SCREEN_NAME.Collection:
        icon = (
          <Svg width="25" height="24" viewBox="0 0 25 24" fill="none">
            <Path
              d="M16.67 10.06H8.32998C7.14998 10.06 6.73998 9.27001 7.42998 8.31001L11.6 2.47001C12.09 1.77001 12.91 1.77001 13.4 2.47001L17.57 8.31001C18.26 9.27001 17.85 10.06 16.67 10.06Z"
              fill={props.isFocused ? '#678F58' : '#22222226'}
            />
            <Path
              d="M18.09 18H6.91C5.33 18 4.79 16.95 5.72 15.67L9.70999 10.06H15.29L19.28 15.67C20.21 16.95 19.67 18 18.09 18Z"
              fill={props.isFocused ? '#678F58' : '#22222266'}
            />
            <Path
              d="M13.25 18V22C13.25 22.41 12.91 22.75 12.5 22.75C12.09 22.75 11.75 22.41 11.75 22V18H13.25Z"
              fill={props.isFocused ? '#678F58' : '#22222266'}
            />
          </Svg>
        );
        break;
      case SCREEN_NAME.Scan:
        icon = (
          <Svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <Path
              opacity="0.4"
              d="M9.01333 29.3333H22.9867C26.6667 29.3333 28.1333 27.08 28.3067 24.3333L29 13.32C29.1867 10.44 26.8933 7.99999 24 7.99999C23.1867 7.99999 22.44 7.53332 22.0667 6.81332L21.1067 4.87999C20.4933 3.66666 18.8933 2.66666 17.5333 2.66666H14.48C13.1067 2.66666 11.5067 3.66666 10.8933 4.87999L9.93333 6.81332C9.56 7.53332 8.81333 7.99999 8 7.99999C5.10667 7.99999 2.81333 10.44 3 13.32L3.69333 24.3333C3.85333 27.08 5.33333 29.3333 9.01333 29.3333Z"
              fillOpacity={0.4}
              fill="white"
            />
            <Path
              d="M18 11.6667H14C13.4533 11.6667 13 11.2133 13 10.6667C13 10.12 13.4533 9.66666 14 9.66666H18C18.5467 9.66666 19 10.12 19 10.6667C19 11.2133 18.5467 11.6667 18 11.6667Z"
              fill="white"
            />
            <Path
              d="M16 24.1733C18.489 24.1733 20.5067 22.1556 20.5067 19.6667C20.5067 17.1777 18.489 15.16 16 15.16C13.511 15.16 11.4933 17.1777 11.4933 19.6667C11.4933 22.1556 13.511 24.1733 16 24.1733Z"
              fill="white"
            />
          </Svg>
        );
        break;
      case SCREEN_NAME.Community:
        icon = (
          <Svg width="25" height="24" viewBox="0 0 25 24" fill="none">
            <Path
              opacity="0.4"
              d="M18.03 7.77C17.96 7.76 17.89 7.76 17.82 7.77C16.27 7.72 15.04 6.45 15.04 4.89C15.04 3.3 16.33 2 17.93 2C19.52 2 20.82 3.29 20.82 4.89C20.81 6.45 19.58 7.72 18.03 7.77Z"
              fill={props.isFocused ? '#678F58' : '#222222'}
            />
            <Path
              opacity="0.4"
              d="M21.29 14.7C20.17 15.45 18.6 15.73 17.15 15.54C17.53 14.72 17.73 13.81 17.74 12.85C17.74 11.85 17.52 10.9 17.1 10.07C18.58 9.87001 20.15 10.15 21.28 10.9C22.86 11.94 22.86 13.65 21.29 14.7Z"
              fill={props.isFocused ? '#678F58' : '#222222'}
            />
            <Path
              opacity="0.4"
              d="M6.94 7.77C7.01 7.76 7.08 7.76 7.15 7.77C8.7 7.72 9.93 6.45 9.93 4.89C9.93 3.3 8.64 2 7.04 2C5.45 2 4.15 3.29 4.15 4.89C4.16 6.45 5.39 7.72 6.94 7.77Z"
              fill={props.isFocused ? '#678F58' : '#222222'}
            />
            <Path
              opacity="0.4"
              d="M7.04999 12.85C7.04999 13.82 7.25999 14.74 7.63999 15.57C6.22999 15.72 4.76 15.42 3.68 14.71C2.1 13.66 2.1 11.95 3.68 10.9C4.75 10.18 6.25999 9.88998 7.68 10.05C7.27 10.89 7.04999 11.84 7.04999 12.85Z"
              fill={props.isFocused ? '#678F58' : '#222222'}
            />
            <Path
              d="M12.62 15.87C12.54 15.86 12.45 15.86 12.36 15.87C10.52 15.81 9.05 14.3 9.05 12.44C9.05 10.54 10.58 9 12.49 9C14.39 9 15.93 10.54 15.93 12.44C15.93 14.3 14.47 15.81 12.62 15.87Z"
              fill={props.isFocused ? '#678F58' : '#222222'}
            />
            <Path
              d="M9.37 17.94C7.86 18.95 7.86 20.61 9.37 21.61C11.09 22.76 13.91 22.76 15.63 21.61C17.14 20.6 17.14 18.94 15.63 17.94C13.92 16.79 11.1 16.79 9.37 17.94Z"
              fill={props.isFocused ? '#678F58' : '#222222'}
            />
          </Svg>
        );
        break;
      case SCREEN_NAME.Around:
        icon = (
          <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <Path
              opacity="0.4"
              d="M8.55999 3.34V17.67C8.21999 17.68 7.87999 17.76 7.62999 17.91L5.27999 19.25C3.63999 20.19 2.28999 19.41 2.28999 17.51V7.78C2.28999 7.15 2.73999 6.37 3.29999 6.05L7.62999 3.57C7.87999 3.43 8.21999 3.35 8.55999 3.34Z"
              fill={props.isFocused ? '#678F58' : '#222222'}
            />
            <Path
              d="M15.73 6.33V20.66C15.38 20.67 15.04 20.61 14.77 20.48L9.52 17.85C9.25 17.72 8.91 17.66 8.56 17.67V3.34C8.91 3.33 9.25 3.39 9.52 3.52L14.77 6.15C15.04 6.28 15.38 6.34 15.73 6.33Z"
              fill={props.isFocused ? '#678F58' : '#222222'}
            />
            <Path
              opacity="0.4"
              d="M22 6.49V16.22C22 16.85 21.55 17.63 20.99 17.95L16.66 20.43C16.41 20.57 16.07 20.65 15.73 20.66V6.33C16.07 6.32 16.41 6.24 16.66 6.09L19.01 4.75C20.65 3.81 22 4.59 22 6.49Z"
              fill={props.isFocused ? '#678F58' : '#222222'}
            />
          </Svg>
        );
        break;
    }
    return icon;
  },
  (prev, next) => prev.isFocused === next.isFocused,
);

export const BlockIcon = (props: ScreenProps) => {
  let icon = <></>;
  switch (props.name) {
    case SCREEN_NAME.Collection:
      icon = (
        <Svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <Path
            opacity="0.4"
            d="M26.95 16.7667H13.05C11.0833 16.7667 10.4 15.45 11.55 13.85L18.5 4.11667C19.3167 2.95 20.6833 2.95 21.5 4.11667L28.45 13.85C29.6 15.45 28.9167 16.7667 26.95 16.7667Z"
            fill="#678F58"
          />
          <Path
            d="M29.3166 30H10.6833C8.04999 30 7.14999 28.25 8.69999 26.1167L15.35 16.7667H24.65L31.3 26.1167C32.85 28.25 31.95 30 29.3166 30Z"
            fill="#678F58"
          />
          <Path
            d="M21.25 30V36.6667C21.25 37.35 20.6833 37.9167 20 37.9167C19.3167 37.9167 18.75 37.35 18.75 36.6667V30H21.25Z"
            fill="#678F58"
          />
        </Svg>
      );
      break;
    case SCREEN_NAME.Scan:
      icon = (
        <Svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <Path
            opacity="0.4"
            d="M11.2667 36.6667H28.7333C33.3333 36.6667 35.1667 33.85 35.3833 30.4167L36.25 16.65C36.4833 13.05 33.6167 10 30 10C28.9833 10 28.05 9.41667 27.5833 8.51667L26.3833 6.1C25.6167 4.58334 23.6167 3.33334 21.9167 3.33334H18.1C16.3833 3.33334 14.3833 4.58334 13.6167 6.1L12.4167 8.51667C11.95 9.41667 11.0167 10 10 10C6.38333 10 3.51666 13.05 3.75 16.65L4.61666 30.4167C4.81666 33.85 6.66667 36.6667 11.2667 36.6667Z"
            fill="#678F58"
          />
          <Path
            d="M22.5 14.5833H17.5C16.8167 14.5833 16.25 14.0167 16.25 13.3333C16.25 12.65 16.8167 12.0833 17.5 12.0833H22.5C23.1833 12.0833 23.75 12.65 23.75 13.3333C23.75 14.0167 23.1833 14.5833 22.5 14.5833Z"
            fill="#678F58"
          />
          <Path
            d="M20 30.2167C23.1112 30.2167 25.6333 27.6945 25.6333 24.5833C25.6333 21.4721 23.1112 18.95 20 18.95C16.8888 18.95 14.3667 21.4721 14.3667 24.5833C14.3667 27.6945 16.8888 30.2167 20 30.2167Z"
            fill="#678F58"
          />
        </Svg>
      );
      break;
    case SCREEN_NAME.Community:
      icon = (
        <Svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <Path
            opacity="0.4"
            d="M29.2167 12.95C29.1 12.9334 28.9833 12.9334 28.8667 12.95C26.2833 12.8667 24.2333 10.75 24.2333 8.15001C24.2333 5.50001 26.3833 3.33334 29.05 3.33334C31.7 3.33334 33.8667 5.48334 33.8667 8.15001C33.85 10.75 31.8 12.8667 29.2167 12.95Z"
            fill="#678F58"
          />
          <Path
            opacity="0.4"
            d="M34.65 24.5C32.7833 25.75 30.1667 26.2166 27.75 25.9C28.3833 24.5333 28.7167 23.0167 28.7333 21.4167C28.7333 19.75 28.3667 18.1667 27.6667 16.7833C30.1333 16.45 32.75 16.9166 34.6333 18.1666C37.2667 19.9 37.2667 22.75 34.65 24.5Z"
            fill="#678F58"
          />
          <Path
            opacity="0.4"
            d="M10.7333 12.95C10.85 12.9334 10.9667 12.9334 11.0833 12.95C13.6667 12.8667 15.7167 10.75 15.7167 8.15001C15.7167 5.50001 13.5667 3.33334 10.9 3.33334C8.25001 3.33334 6.08334 5.48334 6.08334 8.15001C6.10001 10.75 8.15001 12.8667 10.7333 12.95Z"
            fill="#678F58"
          />
          <Path
            opacity="0.4"
            d="M10.9167 21.4167C10.9167 23.0333 11.2667 24.5667 11.9 25.95C9.55 26.2 7.1 25.7 5.3 24.5167C2.66666 22.7667 2.66666 19.9167 5.3 18.1667C7.08333 16.9667 9.6 16.4833 11.9667 16.75C11.2833 18.15 10.9167 19.7334 10.9167 21.4167Z"
            fill="#678F58"
          />
          <Path
            d="M20.2 26.45C20.0667 26.4333 19.9167 26.4333 19.7667 26.45C16.7 26.35 14.25 23.8333 14.25 20.7333C14.25 17.5667 16.8 15 19.9833 15C23.15 15 25.7167 17.5667 25.7167 20.7333C25.7167 23.8333 23.2833 26.35 20.2 26.45Z"
            fill="#678F58"
          />
          <Path
            d="M14.7833 29.9C12.2667 31.5833 12.2667 34.35 14.7833 36.0167C17.65 37.9333 22.35 37.9333 25.2167 36.0167C27.7333 34.3333 27.7333 31.5667 25.2167 29.9C22.3667 27.9833 17.6667 27.9833 14.7833 29.9Z"
            fill="#678F58"
          />
        </Svg>
      );
      break;
    case SCREEN_NAME.Around:
      icon = (
        <Svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <Path
            opacity="0.4"
            d="M14.2667 5.56668V29.45C13.7 29.4667 13.1333 29.6 12.7167 29.85L8.8 32.0834C6.06667 33.65 3.81667 32.35 3.81667 29.1833V12.9667C3.81667 11.9167 4.56667 10.6167 5.5 10.0833L12.7167 5.95001C13.1333 5.71668 13.7 5.58335 14.2667 5.56668Z"
            fill="#678F58"
          />
          <Path
            d="M26.2167 10.55V34.4333C25.6333 34.45 25.0667 34.35 24.6167 34.1333L15.8667 29.75C15.4167 29.5333 14.85 29.4333 14.2667 29.45V5.56667C14.85 5.55 15.4167 5.65 15.8667 5.86667L24.6167 10.25C25.0667 10.4667 25.6333 10.5667 26.2167 10.55Z"
            fill="#678F58"
          />
          <Path
            opacity="0.4"
            d="M36.6667 10.8167V27.0333C36.6667 28.0833 35.9167 29.3833 34.9833 29.9167L27.7667 34.05C27.35 34.2833 26.7833 34.4167 26.2167 34.4333V10.55C26.7833 10.5333 27.35 10.4 27.7667 10.15L31.6833 7.91667C34.4167 6.35001 36.6667 7.65001 36.6667 10.8167Z"
            fill="#678F58"
          />
        </Svg>
      );
      break;
  }
  return icon;
};