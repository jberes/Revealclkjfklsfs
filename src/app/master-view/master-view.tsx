import { IgrAvatar, IgrAvatarModule, IgrList, IgrListItem, IgrListModule } from 'igniteui-react';
import { RvRevealView } from '@revealbi/ui-react';
import { useState } from 'react';
import { RevealSdkSettings, RevealViewOptions } from '@revealbi/ui';
import { useGetDashboardNamesList } from '../hooks/data-source1-hooks';
import styles from './master-view.module.css';
import createClassTransformer from '../style-utils';

IgrAvatarModule.register();
IgrListModule.register();

export default function MasterView() {
  const classes = createClassTransformer(styles);
  const uuid = () => crypto.randomUUID();
  const [dashboardName, setDashboardName] = useState<string | undefined>();
  const { dataSource1DashboardNames } = useGetDashboardNamesList();
  RevealSdkSettings.serverUrl = 'https://localhost:7219/';

  const dashboardOptions: RevealViewOptions = {
    visualizations: {
      menu: {
        copy: false,
        duplicate: false
      }
    }
  };

  return (
    <>
      <div className={classes("row-layout master-view-container")}>
        <div className={classes("column-layout group")}>
          <IgrList className={classes("list")}>
            {dataSource1DashboardNames?.map((item) => (
              <div style={{display: 'contents'}} onClick={() => setDashboardName(item.dashboardFileName)} key={uuid()}>
                <IgrListItem>
                  <div slot="start" key={uuid()}>
                    <IgrAvatar shape="circle" className={classes("avatar")} key={uuid()}>
                      <span className={classes("material-icons")} key={uuid()}>
                        <span key={uuid()}>person</span>
                      </span>
                    </IgrAvatar>
                  </div>
                  <div slot="title" key={uuid()}>{item.dashboardTitle}</div>
                  <div slot="subtitle" key={uuid()}>{item.dashboardFileName}</div>
                  <span slot="end" className={classes("material-icons icon")} key={uuid()}>
                    <span key={uuid()}>star</span>
                  </span>
                </IgrListItem>
              </div>
            ))}
          </IgrList>
        </div>
        <div className={classes("column-layout group_1")}>
          <div className={classes("group_2")}>
            <RvRevealView dashboard={dashboardName!} options={dashboardOptions}></RvRevealView>
          </div>
        </div>
      </div>
    </>
  );
}
