import React, { useEffect }    from 'react'
import { wait, useIsMounted, } from '@/utils'
import Image                   from 'next/image'
import logo                 from '../../public/icon_dark_no_background_150.png'
import Cookies              from 'js-cookie'

const getRandomDelay = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const simulateTyping = async (elementId, text, minTypingSpeed, maxTypingSpeed): Promise<void> => {
  let element = document.getElementById(elementId);
  let currentIndex = 0;

  return new Promise((resolve) => {
    function typeCharacter() {
      if (currentIndex < text.length) {
        element.textContent += text.charAt(currentIndex);
        currentIndex++;
        setTimeout(typeCharacter, getRandomDelay(minTypingSpeed, maxTypingSpeed));
      } else {
        resolve();
      }
    }

    typeCharacter();
  });
}



const simulateDeleting = async (elementId,  numCharsToDelete, minDeletingSpeed, maxDeletingSpeed): Promise<void> => {
  let element = document.getElementById(elementId);
  let currentIndex = numCharsToDelete;

  return new Promise((resolve) => {
    function deleteCharacter() {
      if (currentIndex > 0) {
        element.textContent = element.textContent.slice(0, -1);
        currentIndex--;
        setTimeout(deleteCharacter, getRandomDelay(minDeletingSpeed, maxDeletingSpeed));
      } else {
        resolve();
      }
    }

    deleteCharacter();
  });
}

const LogoAnimation = () => {

  const isMounted = useIsMounted()

  useEffect(() => {

    if (Cookies.get('logo-animation') === 'done') return

    const _simulateTyping = async (): Promise<void> => {

      const logoText = document.getElementById('logo-text')
      logoText.textContent = ''
      logoText.classList.add('blinking-cursor')

      await wait(1000)
      await simulateTyping('logo-text', 're-think', 100, 150);
      await wait(1000)
      await simulateDeleting('logo-text', 5, 100, 150);
      await simulateTyping('logo-text', 'build', 100, 150);
      await wait(1000)
      await simulateDeleting('logo-text', 5, 100, 150);
      await simulateTyping('logo-text', 'public', 100, 150);
      await wait(1000)
      logoText.classList.remove('blinking-cursor')
      logoText.classList.add('done-typing')
      await wait(1000)
      logoText.classList.remove('done-typing')
      Cookies.set('logo-animation', 'done')
    }

    _simulateTyping()


  }, [])

  return (
    <>
      <Image
        className={'fade-in'}
        src={logo} alt={'Re-Public logo'}
        width={150}
        height={150}
      />
      <span id={'logo-text'} className={`logo-animation font-visby tracking-wide`}>
        {
          isMounted && Cookies.get('logo-animation') === 'done' ? 're-public' : ''
        }
      </span>
    </>
  )
}

export default LogoAnimation
