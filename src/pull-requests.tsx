import { List } from "@raycast/api"
import Item from "./components/Item"
import { usePrs } from "./hooks/hooks"

export default function MyPullRequests() {
  const { myOpenPrs, mentionedPrs, isLoading, prsDetails, prsReviews } =
    usePrs()

  return (
    <List isLoading={isLoading}>
      <List.Section title={"Opened by me"}>
        {myOpenPrs?.map((pr) => {
          return (
            <Item
              key={pr.url}
              {...pr}
              details={prsDetails?.[pr.id]}
              reviews={prsReviews?.[pr.id]}
            />
          )
        })}
      </List.Section>
      <List.Section title={"Mentioned in"}>
        {mentionedPrs?.map((pr) => {
          return (
            <Item
              key={pr.url}
              {...pr}
              details={prsDetails?.[pr.id]}
              reviews={prsReviews?.[pr.id]}
            />
          )
        })}
      </List.Section>
      <List.EmptyView title="No pull requests found" />
    </List>
  )
}
