import styled from '@emotion/styled'
import type { StoryFn } from '@storybook/react'
import { Stack, fadeIn, fadeOut } from '@ultraviolet/ui'
import { type ComponentProps, useCallback, useEffect, useState } from 'react'
import { Navigation, NavigationProvider, useNavigation } from '..'
import logoSmall from './assets/logo-small.svg'
import logo from './assets/logo.svg'

const Image = styled.img`
  animation: ${fadeIn} 300ms ease-in-out;

  &[data-expanded='false'] {
    animation: ${fadeOut} 250ms linear forwards;
  }
`
const onClickPinUnpin: ComponentProps<
  typeof Navigation.Item
>['onClickPinUnpin'] = ({ totalPinned }) => {
  // oxlint-disable-next-line eslint/no-console
  console.log('total pinned items:', totalPinned)
}

const PlaygroundContent = ({ ...props }: ComponentProps<typeof Navigation>) => {
  const [active, setActive] = useState('Instance')
  const [instanceExpanded, setInstanceExpanded] = useState(false)
  const [pinnedItemsExpanded, setPinnedItemsExpanded] = useState(false)
  const [expanded, setExpanded] = useState(true)

  const { pinnedItems } = useNavigation()

  const saveExpandedInLocalStorage = useCallback((localExpanded: boolean) => {
    setExpanded(localExpanded)
    // oxlint-disable-next-line eslint/no-console
    console.log(
      `expanded state with value ${localExpanded} saved in local storage`,
    )
    localStorage.setItem('expanded', localExpanded.toString())
  }, [])

  useEffect(() => {
    // oxlint-disable-next-line eslint/no-console
    console.log('pinned items:', pinnedItems)
    localStorage.setItem('pinnedItems', pinnedItems.toString())
  }, [pinnedItems])

  const saveWidthInLocalStorage = useCallback((width: number) => {
    // oxlint-disable-next-line eslint/no-console
    console.log(`width of ${width} saved in local storage`)
    localStorage.setItem('width', width.toString())
  }, [])

  return (
    <Navigation
      onWidthResize={saveWidthInLocalStorage}
      onToggleExpand={saveExpandedInLocalStorage}
      logo={
        <a
          href="https://scaleway.com"
          target="_blank"
          rel="noreferrer"
          aria-label="logo"
        >
          <Stack gap={1} direction="row">
            <img src={logoSmall} alt="" height="22px" />
            <Image src={logo} alt="" height="22px" data-expanded={expanded} />
          </Stack>
        </a>
      }
      {...props}
    >
      <Navigation.Item
        label="Organization Dashboard"
        id="organization-dashboard"
        categoryIcon="console"
        categoryIconVariant="neutral"
        noPinButton
        active={active === 'Organization Dashboard'}
        onClickPinUnpin={onClickPinUnpin}
        onToggle={() => setActive('Organization Dashboard')}
      />
      <Navigation.Item
        label="Project Dashboard"
        id="project-dashboard"
        categoryIcon="useCase"
        categoryIconVariant="neutral"
        noPinButton
        active={active === 'Project Dashboard'}
        onClickPinUnpin={onClickPinUnpin}
        onToggle={() => setActive('Project Dashboard')}
      />
      <Navigation.PinnedItems
        toggle={pinnedItemsExpanded}
        onToggle={toggle => setPinnedItemsExpanded(!!toggle)}
      />
      <Navigation.Separator />
      <Navigation.Group label="Products">
        <Navigation.Item
          label="Compute"
          id="compute"
          subLabel="All compute ressources"
          categoryIcon="baremetal"
          toggle={instanceExpanded}
          onToggle={toggle => setInstanceExpanded(!!toggle)}
        >
          <Navigation.Item
            label="Instance"
            id="instance"
            badgeText="new"
            badgeSentiment="success"
            active={active === 'Instance'}
            onClickPinUnpin={onClickPinUnpin}
            onToggle={() => setActive('Instance')}
          />
          <Navigation.Item
            label="Elastic Metal"
            id="elastic-metal"
            disabled
            active={active === 'Elastic Metal'}
            onClickPinUnpin={onClickPinUnpin}
            onToggle={() => setActive('Elastic Metal')}
          />
          <Navigation.Item
            label="Dedibox"
            id="dedibox"
            href="https://scaleway.com"
            target="_blank"
            active={active === 'Dedibox'}
            onClickPinUnpin={onClickPinUnpin}
            onToggle={() => setActive('Dedibox')}
          />
          <Navigation.Item
            label="Very long product name with spaces"
            id="very-long-product-name-with-spaces"
            badgeText="internal"
            badgeSentiment="danger"
            active={active === 'Very long product name with spaces'}
            onClickPinUnpin={onClickPinUnpin}
            onToggle={() => setActive('Very long product name with spaces')}
          />
          <Navigation.Item
            label="Verylongproductnamewithoutspace"
            id="verylongproductnamewithoutspace"
            badgeText="internal"
            badgeSentiment="danger"
            active={active === 'Verylongproductnamewithoutspace'}
            onClickPinUnpin={onClickPinUnpin}
            onToggle={() => setActive('Verylongproductnamewithoutspace')}
          />
          <Navigation.Item id="advanced" label="Advanced">
            <Navigation.Item
              label="Kubernetes"
              id="kubernetes"
              active={active === 'Kubernetes'}
              onClickPinUnpin={onClickPinUnpin}
              onToggle={() => setActive('Kubernetes')}
            />
            <Navigation.Item
              label="OpenStack"
              id="openstack"
              active={active === 'OpenStack'}
              onClickPinUnpin={onClickPinUnpin}
              onToggle={() => setActive('OpenStack')}
            />
          </Navigation.Item>
        </Navigation.Item>
        <Navigation.Item
          label="Storage"
          id="storage"
          categoryIcon="managedServices"
        >
          <Navigation.Item
            label="Block Storage"
            id="block-storage"
            active={active === 'Block Storage'}
            onClickPinUnpin={onClickPinUnpin}
            onToggle={() => setActive('Block Storage')}
          />
          <Navigation.Item
            label="Object Storage"
            id="object-storage"
            badgeText="beta"
            badgeSentiment="warning"
            active={active === 'Object Storage'}
            onClickPinUnpin={onClickPinUnpin}
            onToggle={() => setActive('Object Storage')}
          />
        </Navigation.Item>
        <Navigation.Item label="Network" id="network" categoryIcon="network">
          <Navigation.Item
            label="Load Balancer"
            id="load-balancer"
            active={active === 'Load Balancer'}
            onClickPinUnpin={onClickPinUnpin}
            onToggle={() => setActive('Load Balancer')}
          />
          <Navigation.Item
            label="IP"
            id="ip"
            active={active === 'IP'}
            onClickPinUnpin={onClickPinUnpin}
            onToggle={() => setActive('IP')}
          />
          <Navigation.Item
            label="VPC"
            id="vpc"
            active={active === 'VPC'}
            onClickPinUnpin={onClickPinUnpin}
            onToggle={() => setActive('VPC')}
          />
        </Navigation.Item>
        <Navigation.Item id="database" label="Database" categoryIcon="database">
          <Navigation.Item
            label="Managed Database"
            id="managed-database"
            active={active === 'Managed Database'}
            onClickPinUnpin={onClickPinUnpin}
            onToggle={() => setActive('Managed Database')}
          />
          <Navigation.Item
            label="Redis"
            id="redis"
            active={active === 'Redis'}
            onClickPinUnpin={onClickPinUnpin}
            onToggle={() => setActive('Redis')}
          />
          <Navigation.Item
            label="Elasticsearch"
            id="elasticsearch"
            active={active === 'Elasticsearch'}
            onClickPinUnpin={onClickPinUnpin}
            onToggle={() => setActive('Elasticsearch')}
          />
        </Navigation.Item>
        <Navigation.Item
          label="Monitoring"
          id="monitoring"
          categoryIcon="observability"
        >
          <Navigation.Item
            label="Logs"
            id="logs"
            active={active === 'Logs'}
            onClickPinUnpin={onClickPinUnpin}
            onToggle={() => setActive('Logs')}
          />
          <Navigation.Item
            label="Metrics"
            id="metrics"
            active={active === 'Metrics'}
            onClickPinUnpin={onClickPinUnpin}
            onToggle={() => setActive('Metrics')}
          />
          <Navigation.Item
            label="Alerts"
            id="alerts"
            active={active === 'Alerts'}
            onClickPinUnpin={onClickPinUnpin}
            onToggle={() => setActive('Alerts')}
          />
        </Navigation.Item>
        <Navigation.Item label="Security" id="security" categoryIcon="security">
          <Navigation.Item
            label="Firewall"
            id="firewall"
            active={active === 'Firewall'}
            onClickPinUnpin={onClickPinUnpin}
            onToggle={() => setActive('Firewall')}
          />
          <Navigation.Item
            label="Certificate"
            id="certificate"
            active={active === 'Certificate'}
            onClickPinUnpin={onClickPinUnpin}
            onToggle={() => setActive('Certificate')}
          />
          <Navigation.Item
            label="VPN"
            id="vpn"
            active={active === 'VPN'}
            onClickPinUnpin={onClickPinUnpin}
            onToggle={() => setActive('VPN')}
          />
        </Navigation.Item>
      </Navigation.Group>
      <Navigation.Separator />
      <Navigation.Item label="Quick Links" id="quick-links" noExpand>
        <Navigation.Item
          label="Support"
          id="support"
          noPinButton
          active={active === 'Support'}
          onClickPinUnpin={onClickPinUnpin}
          onToggle={() => setActive('Support')}
        />
        <Navigation.Item
          label="Abuse"
          id="abuse"
          noPinButton
          active={active === 'Abuse'}
          onClickPinUnpin={onClickPinUnpin}
          onToggle={() => setActive('Abuse')}
        />
        <Navigation.Item
          label="Documentation"
          id="documentation"
          badgeText="new"
          badgeSentiment="success"
          href="http://scaleway.com"
          target="_blank"
          active={active === 'Documentation'}
          onClickPinUnpin={onClickPinUnpin}
          onToggle={() => setActive('Documentation')}
        />
        <Navigation.Item
          label="Feature Request"
          id="feature-request"
          href="http://scaleway.com"
          target="_blank"
          active={active === 'Feature Request'}
          onClickPinUnpin={onClickPinUnpin}
          onToggle={() => setActive('Feature Request')}
        />
      </Navigation.Item>
    </Navigation>
  )
}

export const Playground: StoryFn<ComponentProps<typeof Navigation>> = props => {
  const navigationExpanded = localStorage.getItem('expanded') === 'true'
  const navigationWidth = Number(localStorage.getItem('width')) || undefined
  const storageItems = localStorage.getItem('pinnedItems')
  const pinnedItems = storageItems ? storageItems.split(',') : []

  return (
    <div
      style={{
        height: '800px',
        display: 'flex',
        background: '#f1f1f1',
        margin: '-10px 0', // This is to compensate the border added by storybook around the story
      }}
    >
      <NavigationProvider
        initialExpanded={navigationExpanded}
        initialWidth={navigationWidth}
        initialPinned={pinnedItems}
        animationType="complex"
        pinLimit={2}
        pinnedFeature
      >
        <PlaygroundContent {...props} />
      </NavigationProvider>
      <div
        style={{
          overflowY: 'scroll',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          flex: '1',
          gap: '16px',
          padding: '16px',
        }}
      >
        <img
          src="https://via.placeholder.com/256"
          width="256px"
          height="256px"
          alt="logo"
        />
        <div>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tempor
          aliquam dui, a laoreet ante faucibus a. In accumsan pharetra dui, a
          lobortis eros suscipit ut. In dapibus quam et massa commodo tincidunt.
          Cras bibendum pharetra ultricies. Sed eget vulputate dui. Morbi nisi
          ipsum, gravida at tristique eu, varius ut nibh. Curabitur non odio
          neque. Curabitur in ante non risus malesuada tempus. Maecenas vel
          ipsum justo. Sed sed nulla eu diam vestibulum molestie vitae nec
          risus. Cras volutpat sollicitudin est in blandit. Proin non sem non
          dolor vulputate faucibus quis pulvinar justo. In porta quis risus
          luctus volutpat. Quisque sagittis aliquam justo, vitae ultrices eros.
          Sed ac arcu ligula. Pellentesque condimentum mattis lacus ut dapibus.
          Nam in sapien eros. Phasellus sagittis ipsum congue augue porta
          placerat. Maecenas quis egestas mauris, non eleifend elit. In turpis
          risus, ultrices ut sem a, auctor lobortis nisi. In molestie porttitor
          commodo. Pellentesque eu convallis nunc. Cras vel ipsum odio. Mauris
          faucibus ac nunc eget vehicula. Quisque at eros aliquam, pretium lacus
          eu, volutpat ligula. Fusce fringilla dolor non pulvinar accumsan.
          Curabitur ullamcorper purus neque, fringilla sollicitudin urna tempus
          quis. Etiam sagittis, purus et venenatis sodales, sapien ipsum
          vestibulum nisl, ut laoreet dolor diam nec erat. Donec ullamcorper
          ante non dolor lobortis, quis lacinia ante ultrices. Pellentesque quis
          condimentum arcu. Nulla ac fringilla eros. Nam at leo at lorem
          sagittis auctor. Suspendisse fringilla pulvinar efficitur. Suspendisse
          non eleifend enim. Pellentesque sit amet lectus vitae enim luctus
          feugiat. Pellentesque porttitor augue at dui placerat congue sed at
          quam. Praesent imperdiet augue urna. Proin a ligula vitae enim
          venenatis ultricies ac vel sapien. Ut dolor massa, vulputate commodo
          accumsan quis, dapibus et purus. Suspendisse at purus massa. Nunc et
          ante at felis pharetra laoreet vel et lectus. Integer euismod urna
          eget mollis commodo. Phasellus blandit mauris sed fermentum accumsan.
          Curabitur eros felis, rutrum vitae dolor sed, efficitur laoreet est.
          Pellentesque blandit eros sed pellentesque vestibulum. Suspendisse nec
          magna diam. Suspendisse feugiat nisi ut augue condimentum, sed
          ullamcorper mauris porta. Sed porttitor libero in condimentum
          scelerisque. Vestibulum ut felis maximus, mollis ante vitae, consequat
          ante. Vivamus ac lacinia arcu, eget fermentum lectus. Vivamus gravida
          sodales metus a facilisis. Nam condimentum massa ut magna sagittis,
          quis varius augue sagittis. Aenean vitae ipsum ac lectus consequat
          convallis ut nec augue. Donec orci tortor, tincidunt rutrum cursus
          non, blandit sed quam. Nunc pulvinar euismod ultrices. Curabitur non
          arcu sed augue faucibus aliquet vitae vitae odio. Cras tincidunt eget
          mi quis rhoncus. Curabitur eleifend pharetra tincidunt. Cras quis
          tortor pellentesque, porttitor massa eget, mattis felis. Nulla aliquet
          sodales tortor sit amet accumsan. Sed vitae interdum ipsum. Sed ut
          volutpat nunc. Praesent aliquam ipsum ex, ac interdum odio vestibulum
          dictum. Suspendisse neque quam, rhoncus aliquam diam eu, finibus
          fringilla metus. Aliquam tristique enim arcu, non dapibus augue
          volutpat eu. Integer ut sollicitudin nulla. Integer et est rutrum,
          placerat orci in, fermentum neque. Sed facilisis nulla a orci finibus
          tempus. Duis consectetur nisi nisl, ut eleifend libero facilisis a.
          Nam quis neque lacus. Morbi a risus vestibulum, varius ex nec, varius
          purus. In non quam risus. Mauris finibus justo erat, sed laoreet sem
          luctus a. In cursus augue id eros ultricies, a pulvinar turpis
          lobortis. Donec malesuada pellentesque venenatis. Nullam semper metus
          at ligula venenatis egestas. Aenean metus nisl, sodales eget
          condimentum sit amet, ullamcorper a nunc. Nullam pulvinar ornare
          turpis a cursus. Ut egestas, nunc eu tempor sollicitudin, eros est
          porttitor magna, vel lobortis quam est in felis. Nam sed sem est.
          Morbi congue egestas felis, eu auctor ex. Integer non diam eu nibh
          congue malesuada. Suspendisse ullamcorper nec odio in eleifend. Nullam
          vehicula, risus quis sodales semper, diam risus ornare odio, ac
          consectetur nisi orci at arcu. Aliquam vulputate nulla non urna
          venenatis aliquet. Aenean tincidunt purus nisi, sit amet semper orci
          lobortis non. Phasellus turpis dolor, rhoncus id pretium eget, auctor
          sed lacus. Cras rutrum urna bibendum augue feugiat tempus. Quisque
          iaculis sapien tellus, consequat semper felis consectetur ac.
          Suspendisse tristique orci pretium, venenatis ante et, venenatis
          risus. Phasellus scelerisque, nisi quis egestas ultrices, arcu libero
          fringilla libero, ut molestie arcu turpis sed leo. Nullam finibus
          libero tristique neque eleifend hendrerit. Praesent non molestie
          libero, sit amet dapibus est. In congue ac nibh id sodales. Mauris
          aliquet ante sit amet est varius congue quis vitae elit. In lectus ex,
          malesuada quis eros eu, gravida ullamcorper lorem. Aliquam porttitor
          odio condimentum nisi pellentesque ullamcorper quis vitae mauris.
          Pellentesque et tortor sem. Duis suscipit orci massa. Duis a tellus
          vitae nunc semper eleifend. Pellentesque venenatis maximus tellus in
          bibendum. Ut risus justo, viverra id lacinia quis, egestas at augue.
          Nulla dolor odio, malesuada nec posuere sed, molestie vitae quam.
          Suspendisse at augue augue.
        </div>
      </div>
    </div>
  )
}
