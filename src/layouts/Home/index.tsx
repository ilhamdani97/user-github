/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input } from "@/components/atoms";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchRepos, fetchUsers } from "@/redux/githubSlice";
import LayoutHome from "./styles";
import { AccordionCard } from "@/components/molecules";
import { FaInfoCircle } from "react-icons/fa";
import colors from "@/utils/colors";
const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch: AppDispatch = useDispatch();
  const { users, repos, loadingRepo, loadingUser, error } = useSelector((state: RootState) => state.github);
  const [activeList, setActiveList] = useState<number | null>(null);

  const searchUsers = useCallback(() => {
    if (!searchTerm) return;
    dispatch(fetchUsers(searchTerm));
  },[dispatch, searchTerm]);


  const RenderList = useMemo(() => {
    if(loadingUser) {
        return (
            <LayoutHome.ContainerList>
                {Array.from({ length: 7 }, (_, index) => (
                    <LayoutHome.LoadingUser key={index}/>
                ))}
            
            </LayoutHome.ContainerList>
        )
        
    }

    if((users.length === 0 && !loadingUser) || error) {
        return (
            <LayoutHome.ContainerInfo>
                <FaInfoCircle size={40} color={colors.orange}/>
                <LayoutHome.TitlePage>{error ? error : searchTerm.length > 0 ? 'Data not found' : 'Search username for shown list!'}</LayoutHome.TitlePage>
            </LayoutHome.ContainerInfo>
        )
    }
    return (
        <LayoutHome.ContainerList>
            {users.map((user: any, index: number) => (
                 <AccordionCard
                    key={index}
                    title={user.login}
                    loading={loadingRepo}
                    active={activeList === user.id}
                    content={repos}
                    onClick={() => {
                        if(user.id === activeList) {
                            setActiveList(null);
                        } else {
                            setActiveList(user.id)
                            dispatch(fetchRepos(user.login))
                        }
                        
                    }}
                />
            ))}
        </LayoutHome.ContainerList>
    )
  },[activeList, dispatch, loadingRepo, loadingUser, repos, users]);

  const RenderMain = useMemo(() => {
    return (
        <LayoutHome.Container>
            <LayoutHome.TitlePage>{'GitHub Repositories Explorer ATASK'}</LayoutHome.TitlePage>
            <LayoutHome.ContainerSearch>
                <Input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search GitHub users..."
                    width="78vw"
                />
                <Button
                    onClick={searchUsers}
                    text={'Search'}
                    width={'10vw'}
                />
            </LayoutHome.ContainerSearch>
            {RenderList}
            
        </LayoutHome.Container>
    )
  },[RenderList, searchTerm, searchUsers]);

  return RenderMain;
    
    // <div className="container mx-auto p-4">
    //   <h1 className="text-xl font-bold mb-4 text-center">GitHub Repositories Explorer</h1>
      
    //   <div>

    //   </div>
    //   <Input
    //     type="text"
    //     value={searchTerm}
    //     onChange={(e) => setSearchTerm(e.target.value)}
    //     placeholder="Search GitHub users..."
    //     width="60vw"
    //   />
    //   <Button
    //     onClick={searchUsers}
    //     text={'Search'}
    //     width={'20vw'}
    //   />
    //   {loading && <p>Loading...</p>}
    //   {error && <p className="text-red-500">{error}</p>}
    //   <ul>
    //     {users.map((user: any) => (
    //       <li
    //         key={user.id}
    //         className="cursor-pointer text-blue-500"
    //         onClick={() => dispatch(fetchRepos(user.login))}
    //       >
    //         {user.login}
    //       </li>
    //     ))}
    //   </ul>
    //   <h2 className="text-lg font-bold mt-4">Repositories</h2>
    //   <ul>
    //     {repos.map((repo: any) => (
    //       <li key={repo.id}>
    //         <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
    //           {repo.name}
    //         </a>
    //       </li>
    //     ))}
    //   </ul>
    // </div>
//   );
};


export default Home;
