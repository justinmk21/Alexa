'use client'

import { ClientOnly, IconButton, Skeleton, Span } from '@chakra-ui/react'
import { ThemeProvider } from 'next-themes'
import * as React from 'react'
import { LuSun } from 'react-icons/lu'

/**
 * Always Light Mode Theme Provider
 */
export function ColorModeProvider(props) {
  return (
    <ThemeProvider
      attribute='class'
      forcedTheme='light' // 🔥 force the app to stay in light mode
      disableTransitionOnChange
      {...props}
    />
  )
}

/**
 * Fake color mode hook that always returns 'light'
 */
export function useColorMode() {
  return {
    colorMode: 'light',
    setColorMode: () => {},
    toggleColorMode: () => {},
  }
}

export function useColorModeValue(light, dark) {
  // Always return the light value
  return light
}

export function ColorModeIcon() {
  return <LuSun />
}

/**
 * Disabled ColorModeButton (always shows sun)
 */
export const ColorModeButton = React.forwardRef(function ColorModeButton(
  props,
  ref
) {
  return (
    <ClientOnly fallback={<Skeleton boxSize='9' />}>
      <IconButton
        variant='ghost'
        aria-label='Color mode locked to light'
        size='sm'
        ref={ref}
        icon={<LuSun />}
        isDisabled
        {...props}
      />
    </ClientOnly>
  )
})

export const LightMode = React.forwardRef(function LightMode(props, ref) {
  return (
    <Span
      color='fg'
      display='contents'
      className='chakra-theme light'
      colorPalette='gray'
      colorScheme='light'
      ref={ref}
      {...props}
    />
  )
})

export const DarkMode = React.forwardRef(function DarkMode(props, ref) {
  // This mode will never be used, but we keep it for compatibility
  return (
    <Span
      color='fg'
      display='contents'
      className='chakra-theme dark'
      colorPalette='gray'
      colorScheme='dark'
      ref={ref}
      {...props}
    />
  )
})
