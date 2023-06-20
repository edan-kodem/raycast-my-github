import { Action, ActionPanel, List, popToRoot } from "@raycast/api"
import { useLocalStorage, useRepos } from "./hooks/hooks"
import { getCalculatedScore } from "./utils/utils"
import { Repo, Usages } from "./types/types"

export default function Repos() {
  const { data, isLoading } = useRepos()
  const { data: usages, set: setUsages } = useLocalStorage<Usages>("usages")

  const reposWithScores = data?.map((repo: Repo) => {
    const usage = (usages || {})[repo.id]
    return {
      ...repo,
      calculatedScore: getCalculatedScore(usage),
    }
  })

  const sortedRepos = [...(reposWithScores || [])].sort(
    (a, b) => b.calculatedScore - a.calculatedScore
  )

  return (
    <List isLoading={isLoading}>
      {sortedRepos?.map((repo: Repo) => {
        return (
          <List.Item
            key={repo.id}
            title={repo.full_name}
            actions={
              <ActionPanel>
                <Action.OpenInBrowser
                  onOpen={() => {
                    setUsages({
                      ...usages,
                      [repo.id]: {
                        lastUsed: new Date(),
                        usageCount: (usages?.[repo.id]?.usageCount || 0) + 1,
                      },
                    })
                    popToRoot()
                  }}
                  title="Open in GitHub.com"
                  url={repo.html_url}
                />
              </ActionPanel>
            }
          />
        )
      })}
      <List.EmptyView title="No repositories found" />
    </List>
  )
}
