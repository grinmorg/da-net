import { CustomDialog } from '@/components/custom-dialog'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Button } from '@/components/ui/button'
import { DialogClose, DialogFooter } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { cn, getSiteTitle } from '@/lib/utils'
import Link from 'next/link'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { quizService } from '@/lib/strapi/services/quizzes'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: getSiteTitle('тесты с вариантами ответов'),
  description:
    'На нашем сайте ты можешь проходить увлекательные тесты на разные темы. Проверяй свои знания, соревнуйся с друзьями или создавай собственные тесты!',
}

export default async function QuizzesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  const { page } = await searchParams
  const currentPage = Number() || 1
  const { data: quizzes, meta } = await quizService.getQuizzes(currentPage)
  const { pagination } = meta

  return (
    <div>
      <h1 className="font-heading mb-8 text-2xl sm:text-4xl">Список тестов</h1>

      <div className="grid gap-5 sm:grid-cols-2">
        {quizzes.map((quiz) => {
          const { title, description, slug, cover } = quiz
          const imageUrl = cover.url

          return (
            <div
              className={cn(
                'border-border shadow-shadow rounded-base bg-main relative border-2 p-4 sm:p-5',
              )}
              key={quiz.id}
            >
              <Link href={`/tests/${slug}`}>
                <AspectRatio
                  className="border-border shadow-shadow rounded-base -bottom-[2px]! border-2"
                  ratio={71 / 26}
                >
                  <img
                    className="rounded-base h-full w-full object-cover"
                    src={imageUrl}
                    alt={title}
                  />
                </AspectRatio>
              </Link>

              <div className="text-main-foreground font-base mt-5 flex min-h-[220px] flex-col">
                <Link href={`/tests/${slug}`}>
                  <h2 className="font-heading text-xl sm:text-2xl">{title}</h2>
                </Link>

                <p className="mt-2 mb-auto">{description}</p>

                <div className="mt-8 grid grid-cols-2 gap-5">
                  <Button asChild variant="neutral">
                    <Link href={`/tests/${slug}`}>Погнали</Link>
                  </Button>
                  <CustomDialog
                    title="Вы считаете что данный квиз тут лишний?"
                    description="Ваш голос поможет сделать проект чуточку лучше"
                    trigger={
                      <Button variant="destructive">Не понравился</Button>
                    }
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
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Пагинация */}
      {pagination.pageCount > 1 && (
        <div className="mt-8">
          <Pagination>
            <PaginationContent>
              {pagination.page > 1 && (
                <PaginationItem>
                  <PaginationPrevious href={`?page=${pagination.page - 1}`} />
                </PaginationItem>
              )}

              {Array.from(
                { length: pagination.pageCount },
                (_, i) => i + 1,
              ).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    href={`?page=${page}`}
                    isActive={page === pagination.page}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}

              {pagination.page < pagination.pageCount && (
                <PaginationItem>
                  <PaginationNext href={`?page=${pagination.page + 1}`} />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  )
}
