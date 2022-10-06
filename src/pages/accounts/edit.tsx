import Head from 'next/head'
import { z } from 'zod'
import { Header } from '../../components/Header'
import { trpc } from '../../utils/trpc'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '../../components/Input'
import { SpinnerGap } from 'phosphor-react'
import isEqual from 'lodash.isequal'
import { useState } from 'react'

const schema = z.object({
  name: z.string().min(1).max(30).or(z.literal('')),
  username: z.string().min(1).max(20).or(z.literal('')),
  description: z.string().max(200).or(z.literal('')),
  websiteUrl: z.string().url().startsWith('https://').or(z.literal('')),
})

type TSettingsFields = z.infer<typeof schema>

type ErrorObject = {
  errorName?: string
  errorUsername?: string
}

const Edit = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    control,
    setValue,
  } = useForm<TSettingsFields>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  })

  const utils = trpc.useContext()

  const currentValues = watch()
  const { mutate: updateUserInfo, isLoading } = trpc.useMutation([
    'protectedUser.updateUserInfo',
  ])
  const { data: loggedUserInfo } = trpc.useQuery(['user.getUserInfo'], {
    onSuccess: (data) => {
      setValue('description', data?.description ?? '')
      setValue('name', data?.name ?? '')
      setValue('username', data?.username ?? '')
      setValue('websiteUrl', data?.website ?? '')
    },
    onError: (err) => console.log(err),
  })

  const [error, setError] = useState<ErrorObject>()

  // Since it's not possible to update all informations from logged user from
  // the form, we just set the data that is changeable, and after that, we
  // compare if it's the same as the logged user data, if it's not, we update
  // because we don't want to let user make unnecessary requests if it's info
  // won't change
  const changeableData = {
    name: loggedUserInfo?.name,
    username: loggedUserInfo?.username,
    description: loggedUserInfo?.description,
    websiteUrl: loggedUserInfo?.website,
  }

  const canSubmit = !isEqual(changeableData, currentValues)

  const handleFormSubmit = (data: TSettingsFields) => {
    if (!canSubmit) return

    updateUserInfo(
      {
        newName: data.name,
        newUsername: data.username.replaceAll(' ', '-'), // no spaces for usernames
        description: data.description,
        website: data.websiteUrl,
      },
      {
        onSuccess: (data) => {
          setError(data.error)
          reset()
        },
        onSettled: () => utils.invalidateQueries(['user.getUserInfo']),
      },
    )
  }

  return (
    <>
      <Head>
        <title>Settings</title>
      </Head>
      <Header />
      <div className="flex h-[calc(100vh-7.5rem)] w-full ">
        <div className="mx-auto my-auto min-h-[480px] w-[960px] max-w-full rounded-md border bg-white">
          <form
            onSubmit={handleSubmit(handleFormSubmit)}
            className="mx-auto flex w-[500px] max-w-full flex-col items-start gap-10 p-8"
          >
            <div className="flex w-full items-baseline justify-between gap-8">
              <label htmlFor="name" className="w-[100px] text-right">
                Name
              </label>
              <div className="flex-1">
                <Input
                  placeholder="Name"
                  error={errors.name}
                  type="text"
                  defaultValue={loggedUserInfo?.name ?? ''}
                  helperText="Help people discover your account by using the name you're known by: either your full name, nickname, or business name."
                  className="mb-4"
                  {...register('name')}
                />
                <p
                  className={`mt-2 text-xs ${
                    error?.errorName ? 'text-red-500' : 'text-gray-400'
                  }`}
                >
                  You can only change your name twice within 14 days.
                </p>
              </div>
            </div>
            <div className="flex w-full items-baseline justify-between gap-8">
              <label htmlFor="username" className="w-[100px] text-right">
                Username
              </label>
              <div className="flex-1">
                <Input
                  placeholder="Username"
                  error={errors.username}
                  type="text"
                  defaultValue={loggedUserInfo?.username ?? ''}
                  className="mb-4"
                  {...register('username')}
                />
                <p
                  className={`mt-2 text-xs ${
                    error?.errorUsername ? 'text-red-500' : 'text-gray-400'
                  }`}
                >
                  {!error?.errorUsername &&
                    `In most cases, you'll be able to change your username back to ${loggedUserInfo?.username} for another 14 days.`}
                  {error?.errorUsername && error?.errorUsername}
                </p>
              </div>
            </div>

            <div className="flex w-full items-baseline justify-between gap-8">
              <label htmlFor="websiteUrl" className="w-[100px] text-right">
                Website
              </label>
              <Input
                placeholder="Website"
                error={errors.websiteUrl}
                defaultValue={loggedUserInfo?.website ?? ''}
                {...register('websiteUrl')}
              />
            </div>

            <div className="flex w-full items-start justify-between gap-8">
              <label
                htmlFor="description"
                className="mt-0 w-[100px] text-right md:mt-1"
              >
                Bio
              </label>
              <Controller
                control={control}
                render={({ field }) => (
                  <div className="w-full flex-1">
                    <textarea
                      placeholder="Bio"
                      className="w-full flex-1 resize-y rounded-sm border p-2"
                      defaultValue={loggedUserInfo?.description ?? ''}
                      cols={30}
                      rows={5}
                      maxLength={150}
                      {...field}
                    />
                    <p className="text-sm text-gray-400">
                      {field.value?.length ?? 0} / 150
                    </p>
                  </div>
                )}
                name="description"
              />
            </div>
            <button
              className="self-end rounded-sm bg-blue-400 px-2 py-1 text-white transition-colors hover:bg-blue-500 disabled:cursor-not-allowed disabled:hover:bg-blue-400"
              disabled={!canSubmit}
              type="submit"
            >
              {!isLoading && 'Submit'}
              {isLoading && <SpinnerGap className="animate-spin" />}
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Edit
