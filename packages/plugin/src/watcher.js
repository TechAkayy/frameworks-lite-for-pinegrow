import chokidar from 'chokidar'

let projectWatcher, lastProjectRefresh

const watchProject = () => {
  const projectRoot =
    pinegrow.getCurrentProject() && pinegrow.getCurrentProject().getDir()
  if (!projectRoot) {
    return
  }

  const reloadProject = () => {
    const prevTimeStamp = lastProjectRefresh
    const currentTimeStamp = new Date().getTime()

    if (!prevTimeStamp || currentTimeStamp - prevTimeStamp > 2000) {
      lastProjectRefresh = currentTimeStamp
      pinegrow.refreshCurrentProject(null, false, true /* no restore tags */)
    }
  }

  try {
    projectWatcher = chokidar.watch(projectRoot, {
      ignored: (filePath) =>
        path.basename(filePath).startsWith('.') ||
        ['node_modules', '_pgbackup', '_pginfo', '_pgexport'].some((s) =>
          filePath.includes(s),
        ),
      persistent: true,
      ignoreInitial: true,
    })
    projectWatcher
      .on('add', (file, stats) => {
        reloadProject()
      })
      .on('unlink', (file, stats) => {
        reloadProject()
      })
      .on('error', (error) => {
        // console.log(error)
      })
  } catch (err) {}
}

const unwatchProject = () => {
  if (projectWatcher) {
    projectWatcher.close()
    projectWatcher = null
  }
  lastProjectRefresh = null
}

pinegrow.addEventHandler('on_project_loaded', watchProject)
pinegrow.addEventHandler('on_project_closed', unwatchProject)
