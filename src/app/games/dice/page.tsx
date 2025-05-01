import { Metadata } from 'next'
import { DiceGame } from './_components/dice-game'
import { DiceProvider } from './dice-context'
import { HistoryList } from './_components/history'
import { Stats } from './_components/stats'
import Script from 'next/script'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Рандомный кубик онлайн - генератор случайных чисел от 1 до 6',
  description:
    'Онлайн генератор виртуального кубика с реалистичной 3D-анимацией. Бросайте кубик бесплатно, получайте случайные числа от 1 до 6, отслеживайте историю бросков и используйте для игр или принятия решений.',
  keywords: [
    'кубик онлайн',
    'бросить кубик',
    'случайное число',
    'генератор кубика',
    'виртуальный кубик',
    'игральный кубик',
    'кубик для игр',
  ],
  openGraph: {
    title: 'Виртуальный кубик онлайн - бросить кубик бесплатно',
    description:
      'Онлайн генератор случайных чисел от 1 до 6 с реалистичной 3D-анимацией. Идеально для игр и принятия решений',
    type: 'website',
    locale: 'ru_RU',
    images: [
      {
        url: '/project2.png',
        width: 1200,
        height: 630,
        alt: 'Виртуальный кубик онлайн',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Виртуальный кубик онлайн - бросить кубик бесплатно',
    description:
      'Онлайн генератор случайных чисел от 1 до 6 с реалистичной 3D-анимацией',
    images: ['/project2.png'],
  },
  alternates: {
    canonical: 'https://da-net.fun/games/dice',
  },
}

const DiceGameJsonLd = () => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Рандомный кубик онлайн',
    description:
      'Генератор случайных чисел от 1 до 6 с реалистичной 3D-анимацией',
    applicationCategory: 'Game',
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    creator: {
      '@type': 'Organization',
      name: 'da-net.fun', // Замените на реальное название вашего сайта
      url: 'https://da-net.fun',
    },
  }

  return (
    <Script
      id="dice-game-json-ld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

const HowToUseJsonLd = () => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'Как использовать виртуальный кубик',
    description: 'Инструкция по использованию онлайн генератора кубика',
    step: [
      {
        '@type': 'HowToStep',
        name: 'Бросок кубика',
        text: "Нажмите на кубик или кнопку 'Бросить кубик'",
      },
      {
        '@type': 'HowToStep',
        name: 'Использование результата',
        text: 'Используйте выпавшее значение для принятия решения',
      },
      {
        '@type': 'HowToStep',
        name: 'Повторный бросок',
        text: 'Если результат вас не устраивает - бросьте кубик снова',
      },
      {
        '@type': 'HowToStep',
        name: 'История бросков',
        text: 'Просматривайте историю бросков в специальном разделе',
      },
    ],
    tool: [
      {
        '@type': 'HowToTool',
        name: 'Виртуальный кубик',
      },
    ],
  }

  return (
    <Script
      id="how-to-use-json-ld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

// Добавляем разметку FAQ для SEO
const FAQJsonLd = () => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Как пользоваться онлайн кубиком?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Просто нажмите на кубик или кнопку 'Бросить кубик', и система мгновенно сгенерирует случайное число от 1 до 6.",
        },
      },
      {
        '@type': 'Question',
        name: 'Действительно ли кубик генерирует случайные числа?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Да, наш генератор использует криптографически стойкий алгоритм для обеспечения действительно случайных результатов с равной вероятностью выпадения каждой грани кубика.',
        },
      },
      {
        '@type': 'Question',
        name: 'Для чего можно использовать виртуальный кубик?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Виртуальный кубик можно использовать для принятия решений, в настольных играх, для обучения вероятности и генерации случайных чисел от 1 до 6.',
        },
      },
      {
        '@type': 'Question',
        name: 'Сохраняется ли история бросков кубика?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Да, все ваши броски сохраняются в истории, которую вы можете просматривать для своего удобства.',
        },
      },
    ],
  }

  return (
    <Script
      id="faq-json-ld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export default function DiceGamePage() {
  return (
    <div itemScope itemType="https://schema.org/WebApplication">
      <DiceGameJsonLd />
      <HowToUseJsonLd />
      <FAQJsonLd />

      <h1 className="font-heading mb-8 text-2xl sm:text-4xl" itemProp="name">
        Рандомный кубик онлайн
      </h1>

      <p className="my-4 max-w-2xl text-lg" itemProp="description">
        Наш онлайн-генератор кубика предоставляет простой и удобный способ
        принять решение, когда у вас есть несколько вариантов выбора. Сервис
        полностью имитирует бросок настоящего игрального кубика, выдавая
        случайный результат от 1 до 6.
      </p>

      <DiceProvider>
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <DiceGame />
          </div>

          <div className="space-y-8">
            <Stats />
            <HistoryList />
          </div>
        </div>
      </DiceProvider>

      <section
        className="bg-muted/50 mt-12 rounded-lg p-6"
        itemScope
        itemType="https://schema.org/HowTo"
      >
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="mb-6 text-2xl font-bold" itemProp="name">
              Как использовать виртуальный кубик?
            </h2>
            <ul className="space-y-3 text-lg">
              <li
                className="flex items-start"
                itemScope
                itemType="https://schema.org/HowToStep"
              >
                <span className="text-primary mr-2">•</span>
                <span itemProp="text">
                  <strong itemProp="name">Нажмите на кубик</strong> или кнопку
                  &quot;Бросить кубик&quot; - система мгновенно сгенерирует
                  случайное число
                </span>
              </li>
              <li
                className="flex flex-wrap items-start"
                itemScope
                itemType="https://schema.org/HowToStep"
              >
                <span>
                  <span className="text-primary mr-2">•</span>
                  <strong itemProp="name">
                    Используйте выпавшее значение
                  </strong>{' '}
                  для принятия решения:
                </span>
                <ul
                  className="mt-2 block w-full space-y-2 pl-6"
                  itemProp="text"
                >
                  <li>- Сопоставьте каждому варианту числа от 1 до 6</li>
                  <li>
                    - Используйте результат броска как окончательный выбор
                  </li>
                </ul>
              </li>
              <li
                className="flex items-start"
                itemScope
                itemType="https://schema.org/HowToStep"
              >
                <span className="text-primary mr-2">•</span>
                <span itemProp="text">
                  <strong itemProp="name">
                    Если результат вас не устраивает
                  </strong>{' '}
                  - вы можете бросить кубик повторно
                </span>
              </li>
              <li
                className="flex items-start"
                itemScope
                itemType="https://schema.org/HowToStep"
              >
                <span className="text-primary mr-2">•</span>
                <span itemProp="text">
                  <strong itemProp="name">История бросков сохраняется</strong> -
                  вы можете отслеживать предыдущие результаты
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-6 text-2xl font-bold">
              Преимущества нашего сервиса
            </h3>
            <ul className="space-y-3 text-lg">
              <li className="flex items-start">
                <span className="text-primary mr-2">✅</span>
                <span>
                  <strong>Честный случайный выбор</strong> - алгоритм
                  гарантирует равную вероятность выпадения каждой грани
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✅</span>
                <span>
                  <strong>Удобный интерфейс</strong> - реалистичная 3D-анимация
                  броска кубика
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✅</span>
                <span>
                  <strong>История результатов</strong> - все броски сохраняются
                  для вашего удобства
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✅</span>
                <span>
                  <strong>Адаптивный дизайн</strong> - работает на любых
                  устройствах
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✅</span>
                <span>
                  <strong>Бесплатно и без регистрации</strong> - просто откройте
                  страницу и бросайте кубик
                </span>
              </li>
            </ul>

            <h3 className="mt-8 mb-4 text-xl font-semibold">
              Где можно применять виртуальный кубик?
            </h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>
                  <strong>Принятие решений</strong> - когда нужно выбрать из
                  нескольких равнозначных вариантов
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>
                  <strong>Настольные игры</strong> - если под рукой нет
                  настоящего кубика
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>
                  <strong>Обучение вероятности</strong> - для демонстрации
                  случайных событий
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>
                  <strong>Генерация случайных чисел</strong> - для любых целей,
                  где нужны значения от 1 до 6
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-background mt-8 rounded-lg p-6">
          <h3 className="mb-4 text-xl font-semibold">
            Технические особенности
          </h3>
          <p>
            Наш генератор кубика использует криптографически стойкий алгоритм
            для обеспечения действительно случайных результатов. Анимация броска
            реализована с помощью современных веб-технологий, что создает эффект
            присутствия.
          </p>
          <p className="text-primary mt-4 font-medium">
            Попробуйте прямо сейчас - возможно, кубик поможет вам принять важное
            решение!
          </p>
        </div>
      </section>

      {/* Добавляем раздел FAQ для SEO */}
      <section
        className="mt-12 mb-8"
        itemScope
        itemType="https://schema.org/FAQPage"
      >
        <h2 className="mb-6 text-2xl font-bold">Часто задаваемые вопросы</h2>

        <div className="space-y-6">
          <div
            className="rounded-lg border p-4"
            itemScope
            itemType="https://schema.org/Question"
          >
            <h3 className="text-xl font-medium" itemProp="name">
              Как пользоваться онлайн кубиком?
            </h3>
            <div
              itemScope
              itemType="https://schema.org/Answer"
              itemProp="acceptedAnswer"
            >
              <p className="mt-2" itemProp="text">
                Просто нажмите на кубик или кнопку &quot;Бросить кубик&quot;, и
                система мгновенно сгенерирует случайное число от 1 до 6.
                Результат отобразится на экране с реалистичной анимацией.
              </p>
            </div>
          </div>

          <div
            className="rounded-lg border p-4"
            itemScope
            itemType="https://schema.org/Question"
          >
            <h3 className="text-xl font-medium" itemProp="name">
              Действительно ли кубик генерирует случайные числа?
            </h3>
            <div
              itemScope
              itemType="https://schema.org/Answer"
              itemProp="acceptedAnswer"
            >
              <p className="mt-2" itemProp="text">
                Да, наш генератор использует криптографически стойкий алгоритм
                для обеспечения действительно случайных результатов с равной
                вероятностью выпадения каждой грани кубика.
              </p>
            </div>
          </div>

          <div
            className="rounded-lg border p-4"
            itemScope
            itemType="https://schema.org/Question"
          >
            <h3 className="text-xl font-medium" itemProp="name">
              Для чего можно использовать виртуальный кубик?
            </h3>
            <div
              itemScope
              itemType="https://schema.org/Answer"
              itemProp="acceptedAnswer"
            >
              <p className="mt-2" itemProp="text">
                Виртуальный кубик можно использовать для принятия решений, в
                настольных играх, для обучения вероятности и генерации случайных
                чисел от 1 до 6. Это отличный инструмент, когда под рукой нет
                настоящего кубика.
              </p>
            </div>
          </div>

          <div
            className="rounded-lg border p-4"
            itemScope
            itemType="https://schema.org/Question"
          >
            <h3 className="text-xl font-medium" itemProp="name">
              Сохраняется ли история бросков кубика?
            </h3>
            <div
              itemScope
              itemType="https://schema.org/Answer"
              itemProp="acceptedAnswer"
            >
              <p className="mt-2" itemProp="text">
                Да, все ваши броски сохраняются в истории, которую вы можете
                просматривать для своего удобства. Это позволяет отслеживать
                результаты и анализировать статистику выпадения различных
                значений.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Добавляем внутренние ссылки на релевантные страницы */}
      <section className="mt-12 mb-8">
        <h2 className="mb-6 text-2xl font-bold">Другие полезные инструменты</h2>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          <Link
            href="/games/coinflip"
            className="hover:bg-muted/50 rounded-lg border p-4 transition"
          >
            <h3 className="text-lg font-medium">Подбросить монету</h3>
            <p className="text-muted-foreground mt-2">
              Простой выбор между орлом и решкой
            </p>
          </Link>
        </div>
      </section>
    </div>
  )
}
