import { useTokens } from '@reservoir0x/reservoir-kit-ui'
import { Flex, FormatCryptoCurrency, Text } from 'components/primitives'
import { useMarketplaceChain } from 'hooks'
import { FC } from 'react'
import { formatDollar } from 'utils/numbers'

type Props = {
  token: ReturnType<typeof useTokens>['data'][0] | null
}

export const PriceData: FC<Props> = ({ token }) => {
  const { reservoirBaseUrl } = useMarketplaceChain()
  const listSourceName = token?.market?.floorAsk?.source?.name as
    | string
    | undefined
  const listSourceDomain = token?.market?.floorAsk?.source?.domain as
    | string
    | undefined

  const offerSourceName = token?.market?.topBid?.source?.name as
    | string
    | undefined
  const offerSourceDomain = token?.market?.topBid?.source?.domain as
    | string
    | undefined

  const listSourceLogo = `${reservoirBaseUrl}/redirect/sources/${
    listSourceDomain || listSourceName
  }/logo/v2`

  const offerSourceLogo = `${reservoirBaseUrl}/redirect/sources/${
    offerSourceDomain || offerSourceName
  }/logo/v2`

  const listSourceRedirect = `${reservoirBaseUrl}/redirect/sources/${
    listSourceDomain || listSourceName
  }/tokens/${token?.token?.contract}:${token?.token?.tokenId}/link/v2`

  const offerSourceRedirect = `${reservoirBaseUrl}/redirect/sources/${
    offerSourceDomain || offerSourceName
  }/tokens/${token?.token?.contract}:${token?.token?.tokenId}/link/v2`

  return (
    <Flex css={{ gap: '$6', py: '$4' }}>
      <Flex direction="column" css={{ gap: '$1' }}>
        <Text style="subtitle2">Price</Text>
        <Flex align="center" css={{ gap: '$2' }}>
          <FormatCryptoCurrency
            amount={token?.market?.floorAsk?.price?.amount?.decimal}
            address={token?.market?.floorAsk?.price?.currency?.contract}
            decimals={token?.market?.floorAsk?.price?.currency?.decimals}
            textStyle="h4"
            logoHeight={20}
          />
          <Text style="body2" css={{ color: '$gray11' }}>
            {formatDollar(
              token?.market?.floorAsk?.price?.amount?.usd as number
            )}
          </Text>
        </Flex>
        <a href={listSourceRedirect} target="_blank" rel="noopener noreferrer">
          <Flex
            align="center"
            css={{
              background: '$gray2',
              p: '$1',
              borderRadius: 4,
              gap: '$1',
              width: 'max-content',
            }}
          >
            <img width="20px" height="20px" src={listSourceLogo} />
            <Text style="body2" css={{ color: '$gray11' }}>
              {listSourceName}
            </Text>
          </Flex>
        </a>
      </Flex>
      <Flex direction="column" css={{ gap: '$1' }}>
        <Text style="subtitle2">Top Offer</Text>
        <Flex align="center" css={{ gap: '$2' }}>
          <FormatCryptoCurrency
            amount={token?.market?.topBid?.price?.amount?.decimal}
            address={token?.market?.topBid?.price?.currency?.contract}
            decimals={token?.market?.topBid?.price?.currency?.decimals}
            textStyle="h4"
            logoHeight={20}
          />
          <Text style="body2" css={{ color: '$gray11' }}>
            {formatDollar(token?.market?.topBid?.price?.amount?.usd)}
          </Text>
        </Flex>
        <a href={offerSourceRedirect} target="_blank" rel="noopener noreferrer">
          <Flex
            align="center"
            css={{
              background: '$gray2',
              p: '$1',
              borderRadius: 4,
              gap: '$1',
              width: 'max-content',
            }}
          >
            <img width="20px" height="20px" src={offerSourceLogo} />
            <Text style="body2" css={{ color: '$gray11' }}>
              {offerSourceName}
            </Text>
          </Flex>
        </a>
      </Flex>
    </Flex>
  )
}