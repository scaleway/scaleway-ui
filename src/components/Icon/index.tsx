import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { forwardRef, useMemo } from 'react'
import { Color } from '../../theme'
import capitalize from '../../utils/capitalize'

// Non Material Design icons: 'send',

const ICONS = {
  'account-multiple': () => (
    <path d="M16 17V19H2V17S2 13 9 13 16 17 16 17M12.5 7.5A3.5 3.5 0 1 0 9 11A3.5 3.5 0 0 0 12.5 7.5M15.94 13A5.32 5.32 0 0 1 18 17V19H22V17S22 13.37 15.94 13M15 4A3.39 3.39 0 0 0 13.07 4.59A5 5 0 0 1 13.07 10.41A3.39 3.39 0 0 0 15 11A3.5 3.5 0 0 0 15 4Z" />
  ),
  alert: () => <path d="M13,14H11V10H13M13,18H11V16H13M1,21H23L12,2L1,21Z" />,
  anchor: () => (
    <path d="M12,2C10.34,2 9,3.34 9,5C9,6.27 9.8,7.4 11,7.83V10H8V12H11V18.92C9.16,18.63 7.53,17.57 6.53,16H8V14H3V19H5V17.3C6.58,19.61 9.2,21 12,21C14.8,21 17.42,19.61 19,17.31V19H21V14H16V16H17.46C16.46,17.56 14.83,18.63 13,18.92V12H16V10H13V7.82C14.2,7.4 15,6.27 15,5C15,3.34 13.66,2 12,2M12,4C12.55,4 13,4.45 13,5C13,5.55 12.55,6 12,6C11.45,6 11,5.55 11,5C11,4.45 11.45,4 12,4Z" />
  ),
  'arrow-down': () => (
    <path d="M12 16.5a1.58 1.58 0 0 1-1.116-.458l-5.921-5.87a1.556 1.556 0 0 1 0-2.213 1.588 1.588 0 0 1 2.232 0L12 12.722l4.804-4.763a1.59 1.59 0 0 1 2.234 0 1.557 1.557 0 0 1 0 2.213l-5.921 5.87A1.584 1.584 0 0 1 12 16.5" />
  ),
  'arrow-left': () => (
    <path d="M5.29289 8.70735C4.90237 8.31683 4.90237 7.68366 5.29289 7.29314L9.29289 3.29314C9.68342 2.90261 10.3166 2.90261 10.7071 3.29314C11.0976 3.68366 11.0976 4.31683 10.7071 4.70735L7.41421 8.00024L10.7071 11.2931C11.0976 11.6837 11.0976 12.3168 10.7071 12.7074C10.3166 13.0979 9.68342 13.0979 9.29289 12.7074L5.29289 8.70735Z" />
  ),
  'arrow-left-double': () => (
    <>
      <path d="M7.29289 9.2823C6.90237 8.89178 6.90237 8.25861 7.29289 7.86809L11.2929 3.86809C11.6834 3.47756 12.3166 3.47756 12.7071 3.86809C13.0976 4.25861 13.0976 4.89178 12.7071 5.2823L9.41421 8.5752L12.7071 11.8681C13.0976 12.2586 13.0976 12.8918 12.7071 13.2823C12.3166 13.6728 11.6834 13.6728 11.2929 13.2823L7.29289 9.2823Z" />
      <path d="M1.29289 9.2823C0.902369 8.89178 0.902369 8.25861 1.29289 7.86809L5.29289 3.86809C5.68342 3.47756 6.31658 3.47756 6.70711 3.86809C7.09763 4.25861 7.09763 4.89178 6.70711 5.2823L3.41421 8.5752L6.70711 11.8681C7.09763 12.2586 7.09763 12.8918 6.70711 13.2823C6.31658 13.6728 5.68342 13.6728 5.29289 13.2823L1.29289 9.2823Z" />
    </>
  ),
  'arrow-right': () => (
    <path d="M10.7071 7.29289C11.0976 7.68342 11.0976 8.31658 10.7071 8.70711L6.70711 12.7071C6.31658 13.0976 5.68342 13.0976 5.29289 12.7071C4.90237 12.3166 4.90237 11.6834 5.29289 11.2929L8.58579 8L5.29289 4.70711C4.90237 4.31658 4.90237 3.68342 5.29289 3.29289C5.68342 2.90237 6.31658 2.90237 6.70711 3.29289L10.7071 7.29289Z" />
  ),
  'arrow-right-bottom': () => (
    <path d="M20 16L14.5 21.5L13.08 20.09L16.17 17H10.5C6.91 17 4 14.09 4 10.5V4H6V10.5C6 13 8 15 10.5 15H16.17L13.09 11.91L14.5 10.5L20 16Z" />
  ),
  'arrow-right-double': () => (
    <>
      <path d="M7.70711 7.86809C8.09763 8.25861 8.09763 8.89178 7.70711 9.2823L3.70711 13.2823C3.31658 13.6728 2.68342 13.6728 2.29289 13.2823C1.90237 12.8918 1.90237 12.2586 2.29289 11.8681L5.58579 8.57519L2.29289 5.2823C1.90237 4.89178 1.90237 4.25861 2.29289 3.86809C2.68342 3.47756 3.31658 3.47756 3.70711 3.86809L7.70711 7.86809Z" />
      <path d="M13.7071 7.86809C14.0976 8.25861 14.0976 8.89178 13.7071 9.2823L9.70711 13.2823C9.31658 13.6728 8.68342 13.6728 8.29289 13.2823C7.90237 12.8918 7.90237 12.2586 8.29289 11.8681L11.5858 8.57519L8.29289 5.2823C7.90237 4.89178 7.90237 4.25861 8.29289 3.86809C8.68342 3.47756 9.31658 3.47756 9.70711 3.86809L13.7071 7.86809Z" />
    </>
  ),
  'arrow-up': () => (
    <path d="M12 7.5c.405 0 .808.153 1.116.458l5.921 5.87a1.556 1.556 0 0 1 0 2.213 1.588 1.588 0 0 1-2.232 0L12 11.278l-4.804 4.763a1.59 1.59 0 0 1-2.234 0 1.557 1.557 0 0 1 0-2.213l5.921-5.87A1.584 1.584 0 0 1 12 7.5" />
  ),
  asterisk: () => (
    <path d="M10,2H14L13.21,9.91L19.66,5.27L21.66,8.73L14.42,12L21.66,15.27L19.66,18.73L13.21,14.09L14,22H10L10.79,14.09L4.34,18.73L2.34,15.27L9.58,12L2.34,8.73L4.34,5.27L10.79,9.91L10,2Z" />
  ),
  'auto-fix': () => (
    <path d="M7.5,5.6L5,7L6.4,4.5L5,2L7.5,3.4L10,2L8.6,4.5L10,7L7.5,5.6M19.5,15.4L22,14L20.6,16.5L22,19L19.5,17.6L17,19L18.4,16.5L17,14L19.5,15.4M22,2L20.6,4.5L22,7L19.5,5.6L17,7L18.4,4.5L17,2L19.5,3.4L22,2M13.34,12.78L15.78,10.34L13.66,8.22L11.22,10.66L13.34,12.78M14.37,7.29L16.71,9.63C17.1,10 17.1,10.65 16.71,11.04L5.04,22.71C4.65,23.1 4,23.1 3.63,22.71L1.29,20.37C0.9,20 0.9,19.35 1.29,18.96L12.96,7.29C13.35,6.9 14,6.9 14.37,7.29Z" />
  ),

  bullhorn: () => (
    <path d="M12,8H4A2,2 0 0,0 2,10V14A2,2 0 0,0 4,16H5V20A1,1 0 0,0 6,21H8A1,1 0 0,0 9,20V16H12L17,20V4L12,8M15,15.6L13,14H4V10H13L15,8.4V15.6M21.5,12C21.5,13.71 20.54,15.26 19,16V8C20.53,8.75 21.5,10.3 21.5,12Z" />
  ),

  burger: () => <path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />,

  calculator: () => (
    <path d="M7,2H17A2,2 0 0,1 19,4V20A2,2 0 0,1 17,22H7A2,2 0 0,1 5,20V4A2,2 0 0,1 7,2M7,4V8H17V4H7M7,10V12H9V10H7M11,10V12H13V10H11M15,10V12H17V10H15M7,14V16H9V14H7M11,14V16H13V14H11M15,14V16H17V14H15M7,18V20H9V18H7M11,18V20H13V18H11M15,18V20H17V18H15Z" />
  ),
  'calendar-range': () => (
    <path d="M9,10H7V12H9V10M13,10H11V12H13V10M17,10H15V12H17V10M19,3H18V1H16V3H8V1H6V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M19,19H5V8H19V19Z" />
  ),
  cancel: () => (
    <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12C4,13.85 4.63,15.55 5.68,16.91L16.91,5.68C15.55,4.63 13.85,4 12,4M12,20A8,8 0 0,0 20,12C20,10.15 19.37,8.45 18.32,7.09L7.09,18.32C8.45,19.37 10.15,20 12,20Z" />
  ),
  'card-account-details-outline': () => (
    <path d="M14.6667 2H1.33333C0.606667 2.02667 0.0266667 2.60667 0 3.33333V12.6667C0.0266667 13.3933 0.606667 13.9733 1.33333 14H14.6667C15.3933 13.9733 15.9733 13.3933 16 12.6667V3.33333C15.9733 2.60667 15.3933 2.02667 14.6667 2ZM14.6667 12.6667H1.33333V3.33333H14.6667V12.6667ZM9.33333 11.3333V10.5C9.33333 9.39333 7.10667 8.83333 6 8.83333C4.89333 8.83333 2.66667 9.39333 2.66667 10.5V11.3333H9.33333ZM6 4.66667C5.55797 4.66667 5.13405 4.84226 4.82149 5.15482C4.50893 5.46738 4.33333 5.89131 4.33333 6.33333C4.33333 6.5522 4.37644 6.76893 4.4602 6.97114C4.54396 7.17335 4.66672 7.35708 4.82149 7.51184C5.13405 7.82441 5.55797 8 6 8C6.21887 8 6.4356 7.95689 6.63781 7.87313C6.84002 7.78938 7.02375 7.66661 7.17851 7.51184C7.33328 7.35708 7.45604 7.17335 7.5398 6.97114C7.62356 6.76893 7.66667 6.5522 7.66667 6.33333C7.66667 6.11446 7.62356 5.89774 7.5398 5.69553C7.45604 5.49332 7.33328 5.30959 7.17851 5.15482C7.02375 5.00006 6.84002 4.87729 6.63781 4.79353C6.4356 4.70978 6.21887 4.66667 6 4.66667V4.66667ZM9.33333 4.66667V5.33333H13.3333V4.66667H9.33333ZM9.33333 6V6.66667H13.3333V6H9.33333ZM9.33333 7.33333V8H12V7.33333H9.33333Z" />
  ),
  check: () => (
    <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
  ),

  'check-circle': () => (
    <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M11,16.5L18,9.5L16.59,8.09L11,13.67L7.91,10.59L6.5,12L11,16.5Z" />
  ),

  'check-circle-outline': () => (
    <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M11,16.5L6.5,12L7.91,10.59L11,13.67L16.59,8.09L18,9.5L11,16.5Z" />
  ),
  'checkbox-blank-outline': () => (
    <path d="M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3M19,5V19H5V5H19Z" />
  ),
  'checkbox-marked-circle-outline': () => (
    <path d="M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2,4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z" />
  ),

  'checkbox-marked-outline': () => (
    <path d="M19,19H5V5H15V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V11H19M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z" />
  ),
  'chevron-down': () => (
    <path d="M9.88,18.29l-9-8.55a2.75,2.75,0,0,1,0-4,3.12,3.12,0,0,1,4.24,0L12,12.25l6.88-6.54a3.12,3.12,0,0,1,4.24,0,2.75,2.75,0,0,1,0,4l-9,8.55a3.12,3.12,0,0,1-4.24,0Z" />
  ),
  'chevron-left': () => (
    <path d="M5.71,9.88l8.55-9a2.75,2.75,0,0,1,4,0,3.12,3.12,0,0,1,0,4.24L11.75,12l6.54,6.88a3.12,3.12,0,0,1,0,4.24,2.75,2.75,0,0,1-4,0l-8.55-9a3.12,3.12,0,0,1,0-4.24Z" />
  ),
  'chevron-right': () => (
    <path d="M18.29,14.12l-8.55,9a2.75,2.75,0,0,1-4,0,3.12,3.12,0,0,1,0-4.24L12.25,12,5.71,5.12a3.12,3.12,0,0,1,0-4.24,2.75,2.75,0,0,1,4,0l8.55,9a3.12,3.12,0,0,1,0,4.24Z" />
  ),

  'chevron-up': () => (
    <path d="M14.12,5.71l9,8.55a2.75,2.75,0,0,1,0,4,3.12,3.12,0,0,1-4.24,0L12,11.75,5.12,18.29a3.12,3.12,0,0,1-4.24,0,2.75,2.75,0,0,1,0-4l9-8.55a3.12,3.12,0,0,1,4.24,0Z" />
  ),
  circle: () => (
    <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
  ),
  'clock-outline': () => (
    <path d="M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z" />
  ),

  close: () => (
    <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
  ),
  'close-circle-outline': () => (
    <path d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z" />
  ),

  'copy-content': () => (
    <path d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z" />
  ),

  credentials: () => (
    <path d="M4.364 9.333c-.804 0-1.455-.671-1.455-1.5 0-.828.651-1.5 1.455-1.5.803 0 1.454.672 1.454 1.5 0 .829-.651 1.5-1.454 1.5zm4.109-3c-.597-1.747-2.211-3-4.11-3C1.954 3.333 0 5.348 0 7.833c0 2.486 1.954 4.5 4.364 4.5 1.898 0 3.512-1.252 4.109-3h3.163v3h2.91v-3H16v-3H8.473z" />
  ),

  'credit-card': () => (
    <path d="M13.3335 5.33268H2.66683V3.99935H13.3335V5.33268ZM13.3335 11.9993H2.66683V7.99935H13.3335V11.9993ZM13.3335 2.66602H2.66683C1.92683 2.66602 1.3335 3.25935 1.3335 3.99935V11.9993C1.3335 12.353 1.47397 12.6921 1.72402 12.9422C1.97407 13.1922 2.31321 13.3327 2.66683 13.3327H13.3335C13.6871 13.3327 14.0263 13.1922 14.2763 12.9422C14.5264 12.6921 14.6668 12.353 14.6668 11.9993V3.99935C14.6668 3.25935 14.0668 2.66602 13.3335 2.66602Z" />
  ),

  delete: () => (
    <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
  ),
  detach: () => (
    <path d="M2,5.27L3.28,4L20,20.72L18.73,22L13.9,17.17L11.29,19.78C9.34,21.73 6.17,21.73 4.22,19.78C2.27,17.83 2.27,14.66 4.22,12.71L5.71,11.22C5.7,12.04 5.83,12.86 6.11,13.65L5.64,14.12C4.46,15.29 4.46,17.19 5.64,18.36C6.81,19.54 8.71,19.54 9.88,18.36L12.5,15.76L10.88,14.15C10.87,14.39 10.77,14.64 10.59,14.83C10.2,15.22 9.56,15.22 9.17,14.83C8.12,13.77 7.63,12.37 7.72,11L2,5.27M12.71,4.22C14.66,2.27 17.83,2.27 19.78,4.22C21.73,6.17 21.73,9.34 19.78,11.29L18.29,12.78C18.3,11.96 18.17,11.14 17.89,10.36L18.36,9.88C19.54,8.71 19.54,6.81 18.36,5.64C17.19,4.46 15.29,4.46 14.12,5.64L10.79,8.97L9.38,7.55L12.71,4.22M13.41,9.17C13.8,8.78 14.44,8.78 14.83,9.17C16.2,10.54 16.61,12.5 16.06,14.23L14.28,12.46C14.23,11.78 13.94,11.11 13.41,10.59C13,10.2 13,9.56 13.41,9.17Z" />
  ),
  doc: () => (
    <>
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
    </>
  ),
  'dots-horizontal': () => (
    <path d="M16,12A2,2 0 0,1 18,10A2,2 0 0,1 20,12A2,2 0 0,1 18,14A2,2 0 0,1 16,12M10,12A2,2 0 0,1 12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12M4,12A2,2 0 0,1 6,10A2,2 0 0,1 8,12A2,2 0 0,1 6,14A2,2 0 0,1 4,12Z" />
  ),

  'dots-vertical': () => (
    <path
      style={{
        transform: 'rotate(-90deg)',
        transformOrigin: '50% 50%',
      }}
      d="M16,12A2,2 0 0,1 18,10A2,2 0 0,1 20,12A2,2 0 0,1 18,14A2,2 0 0,1 16,12M10,12A2,2 0 0,1 12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12M4,12A2,2 0 0,1 6,10A2,2 0 0,1 8,12A2,2 0 0,1 6,14A2,2 0 0,1 4,12Z"
    />
  ),
  download: () => <path d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z" />,

  'drag-variant': () => (
    <path d="M22.67,12L18.18,16.5L15.67,14L17.65,12L15.67,10.04L18.18,7.53L22.67,12M12,1.33L16.47,5.82L13.96,8.33L12,6.35L10,8.33L7.5,5.82L12,1.33M12,22.67L7.53,18.18L10.04,15.67L12,17.65L14,15.67L16.5,18.18L12,22.67M1.33,12L5.82,7.5L8.33,10L6.35,12L8.33,13.96L5.82,16.47L1.33,12M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10Z" />
  ),
  'drag-vertical': () => (
    <path d="M9,3H11V5H9V3M13,3H15V5H13V3M9,7H11V9H9V7M13,7H15V9H13V7M9,11H11V13H9V11M13,11H15V13H13V11M9,15H11V17H9V15M13,15H15V17H13V15M9,19H11V21H9V19M13,19H15V21H13V19Z" />
  ),
  east: () => (
    <path d="M15 5l-1.41 1.41L18.17 11H2v2h16.17l-4.59 4.59L15 19l7-7-7-7z" />
  ),
  'email-outline': () => (
    <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6m-2 0-8 5-8-5h16m0 12H4V8l8 5 8-5v10Z" />
  ),
  expand: () => (
    <>
      <path d="M5.96364 11L2 7L5.96364 3L6.98909 4.03486L4.78545 6.26605H15.2145L13.0109 4.03486L14.0364 3L18 7L14.0364 11L13.0109 9.96514L15.2145 7.73394H4.78545L6.98909 9.96514L5.96364 11Z" />
      <path fillRule="evenodd" clipRule="evenodd" d="M18 14V0H20V14H18Z" />
      <path fillRule="evenodd" clipRule="evenodd" d="M0 14V0H2V14H0Z" />
    </>
  ),
  eye: () => (
    <path d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z" />
  ),
  'eye-off': () => (
    <path d="M11.83,9L15,12.16C15,12.11 15,12.05 15,12A3,3 0 0,0 12,9C11.94,9 11.89,9 11.83,9M7.53,9.8L9.08,11.35C9.03,11.56 9,11.77 9,12A3,3 0 0,0 12,15C12.22,15 12.44,14.97 12.65,14.92L14.2,16.47C13.53,16.8 12.79,17 12,17A5,5 0 0,1 7,12C7,11.21 7.2,10.47 7.53,9.8M2,4.27L4.28,6.55L4.73,7C3.08,8.3 1.78,10 1,12C2.73,16.39 7,19.5 12,19.5C13.55,19.5 15.03,19.2 16.38,18.66L16.81,19.08L19.73,22L21,20.73L3.27,3M12,7A5,5 0 0,1 17,12C17,12.64 16.87,13.26 16.64,13.82L19.57,16.75C21.07,15.5 22.27,13.86 23,12C21.27,7.61 17,4.5 12,4.5C10.6,4.5 9.26,4.75 8,5.2L10.17,7.35C10.74,7.13 11.35,7 12,7Z" />
  ),
  filter: () => (
    <path d="M14,12V19.88C14.04,20.18 13.94,20.5 13.71,20.71C13.32,21.1 12.69,21.1 12.3,20.71L10.29,18.7C10.06,18.47 9.96,18.16 10,17.87V12H9.97L4.21,4.62C3.87,4.19 3.95,3.56 4.38,3.22C4.57,3.08 4.78,3 5,3V3H19V3C19.22,3 19.43,3.08 19.62,3.22C20.05,3.56 20.13,4.19 19.79,4.62L14.03,12H14Z" />
  ),
  github: () => (
    <path d="M12.02 2.99c-5.15 0-9.32 4.13-9.32 9.23 0 4.08 2.67 7.53 6.37 8.75.47.08.64-.2.64-.44l-.01-1.72c-2.34.43-2.95-.57-3.13-1.08-.1-.27-.56-1.08-.95-1.3-.33-.17-.79-.6-.01-.61.73-.01 1.26.67 1.43.95.84 1.4 2.18 1 2.72.76.08-.6.33-1 .59-1.23-2.07-.23-4.24-1.03-4.24-4.56 0-1 .36-1.83.96-2.48-.09-.23-.42-1.18.09-2.45 0 0 .78-.24 2.56.95a8.7 8.7 0 0 1 2.33-.31 8.7 8.7 0 0 1 2.33.31c1.78-1.2 2.56-.95 2.56-.95.51 1.27.19 2.22.09 2.45.59.65.96 1.47.96 2.48 0 3.54-2.18 4.33-4.25 4.56.34.29.63.84.63 1.71l-.01 2.54c0 .24.18.53.64.44 3.68-1.22 6.35-4.68 6.35-8.75 0-5.1-4.17-9.23-9.32-9.23z" />
  ),
  'help-circle-outline': () => (
    <path d="M11,18H13V16H11V18M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,6A4,4 0 0,0 8,10H10A2,2 0 0,1 12,8A2,2 0 0,1 14,10C14,12 11,11.75 11,15H13C13,12.75 16,12.5 16,10A4,4 0 0,0 12,6Z" />
  ),
  'information-outline': () => (
    <path d="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z" />
  ),

  key: () => (
    <path d="M12.65 10C11.83 7.67 9.61 6 7 6c-3.31 0-6 2.69-6 6s2.69 6 6 6c2.61 0 4.83-1.67 5.65-4H17v4h4v-4h2v-4H12.65zM7 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
  ),
  lock: () => (
    <path d="M12,17A2,2 0 0,0 14,15C14,13.89 13.1,13 12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V10C4,8.89 4.9,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z" />
  ),

  logout: () => (
    <path d="M12.488 2.296l-1.365 1.365a5.618 5.618 0 0 1 2.72 4.81 5.647 5.647 0 0 1-11.294 0c0-2.043 1.092-3.822 2.71-4.82L3.905 2.297A7.493 7.493 0 0 0 .667 8.471a7.53 7.53 0 0 0 15.058 0c0-2.56-1.28-4.82-3.237-6.175M9.138 0H7.254v9.412h1.882" />
  ),
  members: () => (
    <path d="M8,0 C9.2886644,0 10.3333334,1.080692 10.3333334,2.41379308 C10.3333334,3.74689425 9.2886644,4.82758617 8,4.82758617 C6.71133558,4.82758617 5.66666666,3.74689425 5.66666666,2.41379308 C5.66666666,1.080692 6.71133558,0 8,0 M3.33333334,1.72413792 C3.70666666,1.72413792 4.05333334,1.82758617 4.35333334,2.01379308 C4.25333334,3 4.53333334,3.97931033 5.10666666,4.74482758 C4.77333334,5.40689658 4.10666666,5.862069 3.33333334,5.862069 C2.22876383,5.862069 1.33333334,4.93576158 1.33333334,3.79310342 C1.33333334,2.65044533 2.22876383,1.72413792 3.33333334,1.72413792 M12.6666666,1.72413792 C13.7712362,1.72413792 14.6666666,2.65044533 14.6666666,3.79310342 C14.6666666,4.93576158 13.7712362,5.862069 12.6666666,5.862069 C11.8933334,5.862069 11.2266666,5.40689658 10.8933334,4.74482758 C11.4666666,3.97931033 11.7466666,3 11.6466666,2.01379308 C11.9466666,1.82758617 12.2933334,1.72413792 12.6666666,1.72413792 M3.66666666,8.79310342 C3.66666666,7.36551725 5.60666666,6.20689658 8,6.20689658 C10.3933334,6.20689658 12.3333334,7.36551725 12.3333334,8.79310342 L12.3333334,10 L3.66666666,10 L3.66666666,8.79310342 M0,10 L0,8.96551725 C0,8.00689658 1.26,7.2 2.96666666,6.96551725 C2.57333334,7.43448275 2.33333334,8.08275858 2.33333334,8.79310342 L2.33333334,10 L0,10 M16,10 L13.6666666,10 L13.6666666,8.79310342 C13.6666666,8.08275858 13.4266666,7.43448275 13.0333334,6.96551725 C14.74,7.2 16,8.00689658 16,8.96551725 L16,10 Z" />
  ),

  minus: () => <path d="M19,13H5V11H19V13Z" />,
  'minus-box-outline': () => (
    <path d="M19,19V5H5V19H19M19,3A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5C3,3.89 3.9,3 5,3H19M17,11V13H7V11H17Z" />
  ),
  moon: () => (
    <path d="M13.98 2.97a9 9 0 1 0 0 18c1.83 0 3.53-.55 4.95-1.48a9 9 0 0 1-4.05-7.52 9 9 0 0 1 4.05-7.52c-1.42-.94-3.12-1.48-4.95-1.48zm0 1.8a7.2 7.2 0 0 1 1.4.14l.28.06-.1.11c-1.5 1.81-2.39 4.09-2.48 6.52l-.01.37c0 2.57.91 4.99 2.48 6.89l.1.11-.28.06a7.3 7.3 0 0 1-1.05.13l-.36.01a7.2 7.2 0 0 1 0-14.4z" />
  ),

  'open-in-new': () => (
    <path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z" />
  ),
  organization: () => (
    <path d="M10.4,8 C9.512,8 8.8,8.712 8.8,9.6 C8.8,10.4836556 9.5163444,11.2 10.4,11.2 C11.2836556,11.2 12,10.4836556 12,9.6 C12,8.712 11.28,8 10.4,8 M8,14.4 C4.4653776,14.4 1.6,11.5346224 1.6,8 C1.6,4.4653776 4.4653776,1.6 8,1.6 C9.69738552,1.6 11.3252506,2.27428378 12.5254834,3.4745166 C13.7257162,4.67474942 14.4,6.30261446 14.4,8 C14.4,11.5346224 11.5346224,14.4 8,14.4 M8,0 C3.581722,0 0,3.581722 0,8 C0,10.1217319 0.84285472,12.1565632 2.34314575,13.6568542 C3.84343678,15.1571453 5.87826808,16 8,16 C10.1217319,16 12.1565632,15.1571453 13.6568542,13.6568542 C15.1571453,12.1565632 16,10.1217319 16,8 C16,5.87826808 15.1571453,3.84343678 13.6568542,2.34314575 C12.1565632,0.84285472 10.1217319,0 8,0 M9.6,5.6 C9.6,4.712 8.88,4 8,4 C7.112,4 6.4,4.712 6.4,5.6 C6.4,6.4836556 7.1163444,7.2 8,7.2 C8.8836556,7.2 9.6,6.4836556 9.6,5.6 M5.6,8 C4.7163444,8 4,8.7163444 4,9.6 C4,10.4836556 4.7163444,11.2 5.6,11.2 C6.4836556,11.2 7.2,10.4836556 7.2,9.6 C7.2,8.712 6.48,8 5.6,8 Z" />
  ),

  pencil: () => (
    <path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
  ),

  plus: () => <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />,

  'plus-box': () => (
    <path d="M17,13H13V17H11V13H7V11H11V7H13V11H17M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z" />
  ),

  'plus-box-outline': () => (
    <path d="M19,19V5H5V19H19M19,3A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5C3,3.89 3.9,3 5,3H19M11,7H13V11H17V13H13V17H11V13H7V11H11V7Z" />
  ),

  privacy: () => (
    <path d="M8.333 0l-7 2.91v4.363c0 4.036 2.987 7.81 7 8.727 4.014-.916 7-4.69 7-8.727V2.909L8.333 0zm0 2.91c1.289 0 2.334.976 2.334 2.18 0 1.206-1.045 2.183-2.334 2.183C7.045 7.273 6 6.296 6 5.09s1.045-2.182 2.333-2.182zm3.99 8.726c-.94 1.346-2.349 2.357-3.99 2.851-1.64-.494-3.049-1.505-3.99-2.85a7.28 7.28 0 0 1-.676-1.113c0-1.2 2.107-2.182 4.666-2.182 2.56 0 4.667.96 4.667 2.182a7.28 7.28 0 0 1-.677 1.112z" />
  ),
  profile: () => (
    <path d="M8 0a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm0 10c4.42 0 8 1.79 8 4v2H0v-2c0-2.21 3.58-4 8-4z" />
  ),

  'progress-check': () => (
    <path d="M8.6667 1.35352V1.36685V2.70018C11.5934 3.06018 13.6667 5.72018 13.3067 8.64685C13 11.0735 11.0934 13.0002 8.6667 13.2868V14.6202C12.3334 14.2535 15 11.0002 14.6334 7.33352C14.3334 4.16685 11.82 1.66685 8.6667 1.35352ZM7.33337 1.37352C6.03337 1.50018 4.79337 2.00018 3.78003 2.84018L4.73337 3.82685C5.48003 3.22685 6.38003 2.84018 7.33337 2.70685V1.37352ZM2.84003 3.78018C2.00003 4.79352 1.50003 6.02685 1.3667 7.33352H2.70003C2.8267 6.38685 3.20003 5.48685 3.79337 4.73352L2.84003 3.78018ZM10.3334 5.66685L7.08003 8.92018L5.6667 7.50685L4.96003 8.21352L7.08003 10.3335L11.04 6.37352L10.3334 5.66685ZM1.37337 8.66685C1.5067 9.97352 2.02003 11.2068 2.8467 12.2202L3.79337 11.2668C3.2067 10.5135 2.8267 9.61352 2.7067 8.66685H1.37337ZM4.73337 12.2468L3.78003 13.1602C4.7867 14.0002 6.0267 14.5268 7.33337 14.6668V13.3335C6.3867 13.2135 5.4867 12.8335 4.73337 12.2468Z" />
  ),

  'ray-end-arrow': () => (
    <path d="M1,12L5,16V13H17.17C17.58,14.17 18.69,15 20,15A3,3 0 0,0 23,12A3,3 0 0,0 20,9C18.69,9 17.58,9.83 17.17,11H5V8L1,12Z" />
  ),
  'ray-start-arrow': () => (
    <path d="M23,12L19,16V13H6.83C6.42,14.17 5.31,15 4,15A3,3 0 0,1 1,12A3,3 0 0,1 4,9C5.31,9 6.42,9.83 6.83,11H19V8L23,12Z" />
  ),
  'ray-start-end': () => (
    <path d="M4,9C5.31,9 6.42,9.83 6.83,11H17.17C17.58,9.83 18.69,9 20,9A3,3 0 0,1 23,12A3,3 0 0,1 20,15C18.69,15 17.58,14.17 17.17,13H6.83C6.42,14.17 5.31,15 4,15A3,3 0 0,1 1,12A3,3 0 0,1 4,9Z" />
  ),

  'ray-top-arrow': () => (
    <path
      style={{
        transform: 'rotate(-90deg)',
        transformOrigin: '50% 50%',
      }}
      d="M1,12L5,16V13H17.17C17.58,14.17 18.69,15 20,15A3,3 0 0,0 23,12A3,3 0 0,0 20,9C18.69,9 17.58,9.83 17.17,11H5V8L1,12Z"
    />
  ),

  reboot: () => (
    <path d="M7.41642 0.862579C7.67678 0.635945 8.07156 0.663281 8.2982 0.923636L10.2249 3.13697C10.2886 3.21021 10.3323 3.29409 10.3563 3.38187C10.4231 3.62507 10.3378 3.89491 10.122 4.05243L7.87533 5.69243C7.59653 5.89594 7.20554 5.83491 7.00202 5.55611C6.79851 5.27731 6.85954 4.88632 7.13834 4.68281L8.26315 3.86172C7.86919 3.77664 7.44926 3.72608 7.00022 3.72608C4.15206 3.72608 1.84521 6.03293 1.84521 8.88108C1.84521 11.7364 4.15253 14.0428 7.00022 14.0428C9.84837 14.0428 12.1552 11.7359 12.1552 8.88775C12.1552 7.8291 11.8344 6.84236 11.2868 6.0211C11.0954 5.7339 11.173 5.34586 11.4602 5.15439C11.7474 4.96291 12.1354 5.04052 12.3269 5.32773C13.0061 6.34647 13.4052 7.57306 13.4052 8.88775C13.4052 12.4263 10.5387 15.2928 7.00022 15.2928C3.46123 15.2928 0.595215 12.4258 0.595215 8.88108C0.595215 5.34257 3.4617 2.47608 7.00022 2.47608C7.37062 2.47608 7.724 2.50452 8.06084 2.55479L7.35537 1.74435C7.12873 1.484 7.15607 1.08921 7.41642 0.862579Z" />
  ),

  restore: () => (
    <path d="M12,3A9,9 0 0,0 3,12H0L4,16L8,12H5A7,7 0 0,1 12,5A7,7 0 0,1 19,12A7,7 0 0,1 12,19C10.5,19 9.09,18.5 7.94,17.7L6.5,19.14C8.04,20.3 9.94,21 12,21A9,9 0 0,0 21,12A9,9 0 0,0 12,3M14,12A2,2 0 0,0 12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14A2,2 0 0,0 14,12Z" />
  ),

  revoke: () => (
    <path d="M17.767 17.333v-2.6H11.7v-3.466h6.067v-2.6L22.1 13l-4.333 4.333zm-1.734-13c.958 0 1.734.776 1.734 1.734V7.8h-1.734V6.067h-7.8v13.866h7.8V18.2h1.734v1.733c0 .958-.776 1.734-1.734 1.734h-7.8A1.733 1.733 0 016.5 19.933V6.067c0-.958.776-1.734 1.733-1.734h7.8z" />
  ),
  rocket: () => (
    <path d="M12.13 20.1899L10.5 16.3599C12.07 15.7799 13.54 14.9999 14.9 14.0899L12.13 20.1899ZM4.64 10.4999L0.809998 8.86991L6.91 6.09991C6 7.45991 5.22 8.92991 4.64 10.4999ZM20.61 0.389911C20.61 0.389911 15.66 -1.73109 10 3.92991C7.81 6.11991 6.5 8.52991 5.65 10.6399C5.37 11.3899 5.56 12.2099 6.11 12.7699L8.24 14.8899C8.79 15.4499 9.61 15.6299 10.36 15.3499C12.5 14.5299 14.88 13.1899 17.07 10.9999C22.73 5.33991 20.61 0.389911 20.61 0.389911ZM13.54 7.45991C12.76 6.67991 12.76 5.40991 13.54 4.62991C14.32 3.84991 15.59 3.84991 16.37 4.62991C17.14 5.40991 17.15 6.67991 16.37 7.45991C15.59 8.23991 14.32 8.23991 13.54 7.45991ZM7.88 14.5299L6.47 13.1199L7.88 14.5299ZM5.24 19.9999L8.88 16.3599C8.54 16.2699 8.21 16.1199 7.91 15.9099L3.83 19.9999H5.24ZM0.999998 19.9999H2.41L7.18 15.2399L5.76 13.8299L0.999998 18.5899V19.9999ZM0.999998 17.1699L5.09 13.0899C4.88 12.7899 4.73 12.4699 4.64 12.1199L0.999998 15.7599V17.1699Z" />
  ),
  search: () => (
    <path d="M17.1526587,15.0943396 L16.0686106,15.0943396 L15.6843911,14.7238422 C17.0291595,13.1595197 17.838765,11.1286449 17.838765,8.9193825 C17.838765,3.99313894 13.8456261,0 8.9193825,0 C3.99313894,0 0,3.99313894 0,8.9193825 C0,13.8456261 3.99313894,17.838765 8.9193825,17.838765 C11.1286449,17.838765 13.1595197,17.0291595 14.7238422,15.6843911 L15.0943396,16.0686106 L15.0943396,17.1526587 L21.9554031,24 L24,21.9554031 L17.1526587,15.0943396 L17.1526587,15.0943396 Z M8.9193825,15.0943396 C5.5025729,15.0943396 2.74442539,12.3361921 2.74442539,8.9193825 C2.74442539,5.5025729 5.5025729,2.74442539 8.9193825,2.74442539 C12.3361921,2.74442539 15.0943396,5.5025729 15.0943396,8.9193825 C15.0943396,12.3361921 12.3361921,15.0943396 8.9193825,15.0943396 L8.9193825,15.0943396 Z" />
  ),
  send: () => (
    <path d="M13.735 8.575l.122.033.1.041a.887.887 0 01.495 1.015l-.034.111-.04.085-1.335 2.477-.001 1.332 1.282-.391 2.147-2a.973.973 0 011.113-.142l.114.071.095.08a.87.87 0 01.132 1.107l-.077.103-.065.068-.935.869 1.306.187a.922.922 0 01.777.694l.02.122.003.116-.01.092a.924.924 0 01-.852.76l-.12.002-.095-.008-2.894-.437-.06.02-1.293.394.743.998 2.702 1.328a.88.88 0 01.402 1.217.955.955 0 01-1.05.456l-.124-.037-.088-.037-1.186-.584.217 1.235a.884.884 0 01-.452.923l-.115.055-.114.038-.094.02a.95.95 0 01-1.013-.53l-.045-.118-.02-.09-.458-2.747-.836-1.09-.788.995-.498 2.842a.936.936 0 01-1.08.738.915.915 0 01-.784-.828v-.116l.01-.092.216-1.235-1.185.584a.972.972 0 01-1.03-.11l-.102-.095-.08-.098-.05-.08a.872.872 0 01.216-1.093l.104-.076.083-.047 2.625-1.265.817-1.065-1.257-.399-2.987.426a.935.935 0 01-1.067-.754.894.894 0 01.582-.97l.114-.036.094-.018 1.304-.187-.933-.869a.869.869 0 01-.213-.982l.064-.123.075-.104.064-.068a.972.972 0 011.13-.146l.12.075.072.06 2.101 1.99 1.332.405.021-1.234L9.826 9.86a.881.881 0 01.422-1.21.97.97 0 011.129.22l.079.1.048.08.599 1.132.598-1.133a.954.954 0 011.034-.474zM17.158 3L21 5.778l-3.842 2.778V6.7H3V4.867h14.158z" />
  ),

  settings: () => (
    <path d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z" />
  ),
  'shield-account': () => (
    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4m0 4a3 3 0 013 3 3 3 0 01-3 3 3 3 0 01-3-3 3 3 0 013-3m5.13 12A9.69 9.69 0 0112 20.92 9.69 9.69 0 016.87 17c-.34-.5-.63-1-.87-1.53 0-1.65 2.71-3 6-3s6 1.32 6 3c-.24.53-.53 1.03-.87 1.53z" />
  ),
  sort: () => <path d="M12 6l-5 5h10l-5-5m-5 7l5 5 5-5H7z" />,

  sun: () => (
    <path d="M11.99 3.03c.41 0 .75.31.81.7v.11 2.48.06a5.7 5.7 0 0 1 2.61 1.08l.04-.04 1.75-1.75c.32-.32.83-.32 1.15 0 .29.29.32.75.07 1.07l-.07.08-1.75 1.75-.04.04a5.7 5.7 0 0 1 1.08 2.61h.06 2.48c.45 0 .82.37.82.82 0 .41-.31.75-.7.81l-.11.01H17.7h-.06a5.7 5.7 0 0 1-1.08 2.61l.04.04 1.75 1.75c.32.32.32.83 0 1.15-.29.29-.75.32-1.07.07l-.08-.07-1.75-1.75-.04-.04a5.7 5.7 0 0 1-2.61 1.08v.06 2.48c0 .45-.37.82-.82.82-.41 0-.75-.31-.81-.7l-.01-.11v-2.48-.06a5.7 5.7 0 0 1-2.61-1.08l-.04.04-1.75 1.75c-.32.32-.83.32-1.15 0-.29-.29-.32-.75-.07-1.07l.07-.08 1.75-1.75.04-.04a5.7 5.7 0 0 1-1.08-2.61h-.06H3.8c-.45 0-.82-.37-.82-.82 0-.41.31-.75.7-.81l.11-.01h2.48.06a5.7 5.7 0 0 1 1.08-2.61l-.04-.04-1.75-1.75c-.32-.32-.32-.83 0-1.15.29-.29.75-.32 1.07-.07l.08.07 1.75 1.75.04.04a5.7 5.7 0 0 1 2.61-1.08v-.06-2.48c0-.45.37-.82.82-.82zm0 4.92c-2.25 0-4.08 1.83-4.08 4.08s1.83 4.08 4.08 4.08 4.08-1.83 4.08-4.08-1.83-4.08-4.08-4.08z" />
  ),
  support: () => (
    <path d="M14.232,10.728 C14.992,8.992 14.992,7 14.232,5.272 L12.04,6.264 C12.52,7.368 12.52,8.624 12.048,9.736 L14.232,10.728 M10.736,1.768 C9,1.008 7.008,1.008 5.272,1.768 L6.264,3.952 C7.376,3.48 8.632,3.48 9.744,3.96 L10.736,1.768 M1.768,5.264 C1.008,7.008 1.008,8.992 1.768,10.736 L3.96,9.736 C3.48,8.632 3.48,7.368 3.96,6.256 L1.768,5.264 M5.272,14.232 C7.008,14.992 9,14.992 10.736,14.224 L9.744,12.04 C8.64,12.52 7.376,12.52 6.272,12.048 L5.272,14.232 M8,0 C10.1217319,0 12.1565632,0.842854723 13.6568542,2.34314575 C15.1571453,3.84343678 16,5.87826808 16,8 C16,12.418278 12.418278,16 8,16 C5.87826808,16 3.84343678,15.1571453 2.34314575,13.6568542 C0.842854723,12.1565632 0,10.1217319 0,8 C0,5.87826808 0.842854723,3.84343678 2.34314575,2.34314575 C3.84343678,0.842854723 5.87826808,0 8,0 M8,4.8 C6.2326888,4.8 4.8,6.2326888 4.8,8 C4.8,9.7673112 6.2326888,11.2 8,11.2 C9.7673112,11.2 11.2,9.7673112 11.2,8 C11.2,6.2326888 9.7673112,4.8 8,4.8 Z" />
  ),
  switch_orga: () => (
    <path d="M10.91 5.818c1.694 0 5.09.851 5.09 2.546v1.818h-4.364V8.364c0-1.091-.589-1.899-1.425-2.51l.698-.036zm-5.82 0c1.695 0 5.092.851 5.092 2.546v1.818H0V8.364c0-1.695 3.396-2.546 5.09-2.546zm0-1.454A2.182 2.182 0 1 1 5.09 0a2.182 2.182 0 0 1 0 4.364zm5.82 0a2.182 2.182 0 1 1 0-4.364 2.182 2.182 0 0 1 0 4.364zm-5.092 7.09v1.637h4.364v-1.636l2.363 2.363-2.363 2.364v-1.637H5.818v1.637l-2.363-2.364 2.363-2.363z" />
  ),

  unlock: () => (
    <path d="M10 13C11.1 13 12 13.89 12 15C12 16.11 11.11 17 10 17S8 16.11 8 15 8.9 13 10 13M18 1C15.24 1 13 3.24 13 6V8H4C2.9 8 2 8.9 2 10V20C2 21.1 2.9 22 4 22H16C17.1 22 18 21.1 18 20V10C18 8.9 17.1 8 16 8H15V6C15 4.34 16.34 3 18 3S21 4.34 21 6V8H23V6C23 3.24 20.76 1 18 1M16 10V20H4V10H16Z" />
  ),
  upload: () => <path d="M9,16V10H5L12,3L19,10H15V16H9M5,20V18H19V20H5Z" />,

  'weather-night': () => (
    <path d="M17.75,4.09L15.22,6.03L16.13,9.09L13.5,7.28L10.87,9.09L11.78,6.03L9.25,4.09L12.44,4L13.5,1L14.56,4L17.75,4.09M21.25,11L19.61,12.25L20.2,14.23L18.5,13.06L16.8,14.23L17.39,12.25L15.75,11L17.81,10.95L18.5,9L19.19,10.95L21.25,11M18.97,15.95C19.8,15.87 20.69,17.05 20.16,17.8C19.84,18.25 19.5,18.67 19.08,19.07C15.17,23 8.84,23 4.94,19.07C1.03,15.17 1.03,8.83 4.94,4.93C5.34,4.53 5.76,4.17 6.21,3.85C6.96,3.32 8.14,4.21 8.06,5.04C7.79,7.9 8.75,10.87 10.95,13.06C13.14,15.26 16.1,16.22 18.97,15.95M17.33,17.97C14.5,17.81 11.7,16.64 9.53,14.5C7.36,12.31 6.2,9.5 6.04,6.68C3.23,9.82 3.34,14.64 6.35,17.66C9.37,20.67 14.19,20.78 17.33,17.97Z" />
  ),
} as const

export const icons = Object.keys(ICONS) as IconName[]

const customViewBoxes = [
  {
    icons: [
      'arrow-left-double',
      'arrow-right-double',
      'arrow-left',
      'arrow-right',
      'credentials',
      'logout',
      'organization',
      'privacy',
      'profile',
      'support',
      'switch_orga',
      'credit-card',
      'progress-check',
      'card-account-details-outline',
      'reboot',
    ],
    viewBox: '0 0 16 16',
  },
  {
    icons: ['members'],
    viewBox: '0 0 16 10',
  },
  {
    icons: ['rocket'],
    viewBox: '0 0 21 21',
  },
  {
    icons: ['expand'],
    viewBox: '0 0 20 14',
  },
]

const sizeStyles = ({ size }: { size: number | string }) => {
  const pxSize =
    typeof size === 'number' && !Number.isNaN(size) ? `${size}px` : size

  return css`
    height: ${pxSize};
    width: ${pxSize};
    min-width: ${pxSize};
    min-height: ${pxSize};
  `
}

export const PROMINENCES = {
  default: '',
  strong: 'strong',
  stronger: 'stronger',
  weak: 'weak',
}

type ProminenceProps = keyof typeof PROMINENCES

const StyledIcon = styled('svg', {
  shouldForwardProp: prop => !['size', 'color', 'prominence'].includes(prop),
})<{
  color: Color | string
  size: number | string
  prominence: ProminenceProps
}>`
  vertical-align: middle;
  fill: ${({ theme, color, prominence }) => {
    // stronger is available only for neutral color
    const definedProminence =
      color !== 'neutral' && prominence === 'stronger'
        ? capitalize(PROMINENCES.default)
        : capitalize(PROMINENCES[prominence])

    const themeColor = theme.colors[color as Color]
    const text = `text${definedProminence}` as keyof typeof themeColor

    return theme.colors?.[color as Color]?.[text] || color
  }};

  ${sizeStyles}
`

export type IconName = keyof typeof ICONS

type IconProps = {
  size?: number | string
  name?: IconName
  prominence?: ProminenceProps
  color?: Color | string
  'data-testid'?: string
  className?: string
}

const Icon = forwardRef<SVGSVGElement, IconProps>(
  (
    {
      name = 'circle',
      color = 'currentColor',
      size = '1em',
      prominence = 'default',
      className,
      'data-testid': dataTestId,
    },
    ref,
  ) => {
    const render = ICONS[name] || ICONS.circle

    const defaultViewBox = useMemo(
      () =>
        customViewBoxes.find(vB => vB.icons.includes(name))?.viewBox ??
        '0 0 24 24',
      [name],
    )

    return (
      <StyledIcon
        ref={ref}
        color={color}
        prominence={prominence}
        size={size}
        viewBox={defaultViewBox}
        className={className}
        data-testid={dataTestId}
      >
        {render()}
      </StyledIcon>
    )
  },
)

export default Icon
