import { CustomDialog } from '@/components/custom-dialog'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DialogClose, DialogFooter } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const ITEMS: {
  name: string
  description: string
  previewImage: string
  link: string
  inDev: boolean
}[] = [
  {
    name: 'Монетка',
    description:
      'Не можешь выбрать, кто моет посуду или кому идти за пиццей? Доверь свою судьбу древнейшему оракулу — монетке! Просто кликни, и она решит за тебя (но если результат не нравится, можно кинуть ещё раз... и ещё... пока не выпадет нужное)',
    link: '/games/coinflip',
    previewImage: '/project1.png',
    inDev: false,
  },
  {
    name: 'Кубик',
    description:
      'Нужно решить спор или выбрать число от 1 до 6? Виртуальный кубик всегда под рукой! Брось его и прими результат как истину в последней инстанции.',
    link: '/games/dice',

    previewImage: '/project2.png',
    inDev: false,
  },
  {
    name: 'Генератор случайных чисел (От 1 до...)',
    description:
      'Лотерея, спор, выбор номера в очереди — этот генератор выдаст тебе «идеально случайное» число. На 100% честно (если не считать, что алгоритмы тоже иногда лгут).',
    link: '/games/',

    previewImage: '/project3.png',
    inDev: true,
  },
  {
    name: 'Какой фильм посмотреть? (Кинорулетка)',
    description:
      'Два часа споров о том, какой фильм включить? Загрузи свой список (или доверься нашему) — и пусть рандом решит за вас. Если выпадет «Титаник», а компания взвоет — виноват не ты, а алгоритм!',
    link: '/games/',

    previewImage: '/project4.png',
    inDev: true,
  },
]

export default function Home() {
  return (
    <div>
      <h1 className="font-heading mb-8 text-2xl sm:text-4xl">Список игр</h1>

      <div className="grid gap-5 sm:grid-cols-2">
        {ITEMS.map((project, id) => {
          return (
            <div
              className={cn(
                'border-border shadow-shadow rounded-base bg-main relative border-2 p-4 sm:p-5',
                project.inDev && 'opacity-60',
              )}
              key={id}
            >
              {/* Бейдж "В разработке" */}
              {project.inDev && (
                <Badge
                  variant="neutral"
                  className="absolute top-6 right-6 z-10"
                >
                  В разработке
                </Badge>
              )}

              <Link href={project.link}>
                <AspectRatio
                  className="border-border shadow-shadow rounded-base -bottom-[2px]! border-2"
                  ratio={71 / 26}
                >
                  <img
                    className="rounded-base h-full w-full object-contain"
                    src={`${project.previewImage}`}
                    alt={project.name}
                  />
                </AspectRatio>
              </Link>

              <div className="text-main-foreground font-base mt-5 flex min-h-[220px] flex-col">
                <Link href={project.link}>
                  <h2 className="font-heading text-xl sm:text-2xl">
                    {project.name}
                  </h2>
                </Link>

                <p className="mt-2 mb-auto">{project.description}</p>

                <div className="mt-8 grid grid-cols-2 gap-5">
                  <Button
                    asChild
                    variant="neutral"
                    className={cn(
                      project.inDev && 'cursor-not-allowed opacity-50',
                    )}
                    disabled={project.inDev}
                  >
                    <Link href={project.link}>
                      {project.inDev ? 'Скоро будет' : 'Погнали'}
                    </Link>
                  </Button>
                  {!project.inDev && (
                    <CustomDialog
                      title="Вы считаете что данная игра тут лишняя?"
                      description="Ваш голос поможет сделать проект чуточку лучше"
                      trigger={<Button variant="destructive">Шлак?</Button>}
                      footer={
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button variant="default">Да, лучше убрать</Button>
                          </DialogClose>
                          <DialogClose asChild>
                            <Button variant="neutral">Отмена</Button>
                          </DialogClose>
                        </DialogFooter>
                      }
                      triggerVariant="destructive"
                    >
                      <Textarea placeholder="По желанию можешь также чиркануть пару слов..."></Textarea>
                    </CustomDialog>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
